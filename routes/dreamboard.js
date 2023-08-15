const express = require('express');
const router = express.Router();
const conn = require('../config/database')
const zlib = require('zlib');
const { Storage } = require('@google-cloud/storage');
const timestamp = Date.now();
const path = require('path');

// 구성 설정 및 클라이언트 초기화
const storage = new Storage({
  projectId: "sustained-digit-395815",
  // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  keyFilename: path.join(__dirname, '../key/sustained-digit-395815-3e50c89cdde8.json')
});

// Google Cloud Storage(GCS)에 데이터를 업로드하는 함수
// file => 특정 버킷과 그 버킷 내의 특정 파일에 대한 참조를 생성하는 변수
// compressed => GCS에 업로드할 압축 데이터
// bucketName => 버킷 이름 
// destFileName => 업로드할 파일 이름
async function uploadCompressedBufferToGCS(file, compressed, bucketName, destFileName) {
  try {
    console.log(compressed, "중간 로그 1:");
    // GCS에 압축된 데이터를 저장(업로드)하는 부분
    await file.save(compressed, {
        // 업로드될 데이터의 메타데이터 설정
        metadata: {
            // 데이터의 MIME 타입 설정. 여기서는 바이너리 데이터를 나타냄
            // contentType: 'application/octet-stream',
            // contentEncoding: 'deflate' // 'deflate'
            contentType: 'application/octet-stream'
        }
    });
    console.log(`압축파일 ${bucketName}에 ${destFileName} 업로드`); // 중간 로그
  } catch (error) {
      console.error("GCS 업로드 중 오류 발생:", error);
  }
}


// /dreamboard/add 연결 시, 클라이언트에서 받은 데이터를 GCS 업로드 및 DB에 추가
router.post("/add", async function(req, res){
  const name = req.body.name;
  const value = req.body.value;
  // console.log('현재 캔버스 JSON문자열:',value, "-> 타입",typeof(value));

  // 버킷 이름 및 업로드할 파일 이름 설정
  const bucketName = 'dreamboard';
  const destFileName = `${req.session.user.user_id}_example${timestamp}.txt`; // ${req.session.user.user_id} + 제목
  // 버킷 및 파일 참조 생성
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(destFileName);
  
  // 데이터를 zlib로 압축
  const compressed = zlib.deflateSync(Buffer.from(value));
  console.log("압축 후 데이터:", compressed, "compressed 데이터 타입: ",typeof(compressed));
  try {
    // GCS에 압축된 파일 업로드
    await uploadCompressedBufferToGCS(file, compressed, bucketName, destFileName);

    //GCS에 업로드한 파일의 URL
    const fileUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`;
    console.log("URL의 데이터 타입", typeof(fileUrl),"으로 DB에 저장")
    // GCS에 업로드한 파일의 공개된 URL을 유저ID와 함께 DB에 저장
    let sql = `INSERT INTO vision_boards (user_id, vision_title, vision_desc, created_at) VALUES ('${req.session.user.user_id}', 'vision_title 1', ?, NOW());`
    conn.query(sql, [fileUrl], (err, rows)=>{
      if(err){
        res.status(500).send('데이터베이스에 저장하는 동안 오류가 발생하였습니다.');
        return;
      }
      console.log('데이터베이스에 URL 저장완료') // 중간 로그
    })
  } catch (err) {
    res.status(500).send('GCS에 업로드하거나 DB에 저장하는 중 오류 발생: ' + err.message);
  }
});
// DB에 마지막으로 저장된 캔버스 객체를 선택하여 해당 경로로 전송
// vision_seq, user_id, vision_desc(GCS_url) 
router.get('/loadData', (req, res)=>{
  console.log(`user_id_session: ${req.session.user.user_id}`); // 중간 로그
  let sql = `
  SELECT vision_seq, user_id, vision_desc 
  FROM vision_boards
  WHERE user_id = "${req.session.user.user_id}"
  ORDER BY vision_seq desc
  LIMIT 1`;

  conn.query(sql, (err, rows)=>{
    if(err){
      res.status(500).send(`서버 에러: ${err.message}`);
      return
    } 
    // console.log('전송완료',rows)
    res.json(rows);
  });
});

module.exports = router;