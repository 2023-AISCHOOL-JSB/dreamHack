const express = require('express');
const router = express.Router();
const conn = require('../config/database')

// /dreamboard/add 연결 시, 클라이언트 측에서 보낸 값을 DB에 추가(저장)
router.post("/add", function(req, res){
  const name = req.body.name;
  const value = req.body.value;
  let sql = `INSERT INTO vision_boards (user_id, vision_title, vision_desc, created_at) VALUES ('${req.session.user.user_id}', 'vision_title 1', ?, NOW());`
  conn.query(sql, [value], (err, rows)=>{
  console.log('저장완료')
  })
})

router.get('/loadData', (req, res)=>{
  // where문 -> user_id = {obj : req.session.user}
  // {obj : req.session.user}
  let sql = `
  SELECT vision_seq, user_id, vision_desc 
  FROM vision_boards
  WHERE user_id = "${req.session.user.user_id}"
  ORDER BY vision_seq desc`
  conn.query(sql, (err, rows)=>{
    if(err){
      res.status(500).send('server error')
      return
    } 
    // console.log('전송완료',rows)
    res.json(rows)
  })
})

module.exports = router;
 