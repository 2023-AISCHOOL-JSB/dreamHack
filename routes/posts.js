const express = require('express');
const router = express.Router();
const conn = require('../config/database')


// 커뮤니티 게시글 작성 페이지 이동
router.get('/write', (req, res) => {
  res.render("write",{obj : req.session.user});
});

// 게시글 작성후 DB 저장, 게시글 내용페이지 이동
router.post('/write',(req,res)=>{
  console.log(req.body)
  let { post_title, post_conent } = req.body;
  // console.log(`${req.session.user.user_id}`)

  let sql = `INSERT INTO posts (post_title, post_conent, post_file, posted_at, post_views, post_likes, user_id) VALUES (?, ?, 'post_file 1', NOW(), 1, 1, '${req.session.user.user_id}');`

  console.log(sql)
  conn.query(sql, [post_title, post_conent], (err, rows) => {
    // 17번째 줄에있는 변수 ?,?는 post_title,post_conent이고, rows는 결과이다
    
    if(rows.affectedRows > 0){
      console.log('성공')
      let sql2 = 'select post_seq  from posts ORDER BY post_seq DESC LIMIT 1'
      conn.query(sql2,(err,rows)=>{
        console.log(rows);
        let num_a = rows[0].post_seq
        res.send(`'<script>location.href="http://localhost:3333/posts/view?num=${num_a}"</script>'`)
      })

    }
  })
})

// 작성한 게시글 내용 페이지 이동
router.get('/view', (req, res) => {
  console.log(req.query);

  let sql = 'select * from posts where post_seq = ?'

  let post_num = req.query.num;
  // sql에 쿼리문이 들어간다 ? 는 변수이다

  conn.query(sql,[post_num],(err,rows)=>{
    // conn 은 require('../config/database') 이다
    // query는 conn에 있는 메서드이다. sql문을 사용할 수 있게해준다.
    // rows 에는 32번째 줄에 sql의 결과물이 들어간다.
    res.render("view",{obj : req.session.user , postContent : rows});
    // req.session.user 정보가 obj라는 이름으로 view에 넘어간다.
    // rows 정보가 postContent라는 이름으로 view에 넘어간다.
  })

  
  //  session = 로그인할 때 생기는 회원 정보. 
});

//게시글 수정 페이지 이동
router.get('/edit', (req, res) => {
  res.render("edit",{obj : req.session.user});
});

// 커뮤니티 페이지 이동
router.get('/community',(req,res)=>{
  let sql = "select * from posts"
  conn.query (sql,(err,rows)=>{
    res.render('community',{obj : req.session.user ,list : rows})
  })
})




module.exports = router;