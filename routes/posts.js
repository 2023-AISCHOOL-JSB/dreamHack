const express = require('express');
const router = express.Router();
const conn = require('../config/database')


// 게시글 작성후 DB 저장, 게시글 내용페이지 이동
router.post('/write',(req,res)=>{
  console.log(req.body)
  let { post_title, post_conent } = req.body;
  // console.log(`${req.session.user.user_id}`)

  let sql = `INSERT INTO posts (post_title, post_conent, post_file, posted_at, post_views, post_likes, user_id) VALUES (?, ?, 'post_file 1', NOW(), 0, 0, '${req.session.user.user_id}');`

  console.log(sql)
  conn.query(sql, [post_title, post_conent], (err, rows) => {
    // 17번째 줄에있는 변수 ?,?는 post_title,post_conent이고, rows는 결과이다
    
    if(rows.affectedRows > 0){
      console.log('성공')
      let sql2 = 'select post_seq  from posts ORDER BY post_seq DESC LIMIT 1'
      conn.query(sql2,(err,rows)=>{
        console.log(rows);
        let num_a = rows[0].post_seq
        res.send(`'<script>location.href="http://localhost:3333/view?num=${num_a}"</script>'`)
      })

    }
  })
})

router.post('/edit',(req,res)=>{
  console.log(req.body);
  let {post_title, post_conent, post_seq} = req.body

  let sql =
    "update posts set post_title = ?, post_conent = ? where post_seq = ?"
  
  conn.query(sql,[post_title,post_conent,post_seq],(err,rows)=>{
    if(rows.affectedRows > 0){
      res.send(
        `'<script>location.href="http://localhost:3333/view?num=${post_seq}"</script>'`
      );
    }
    
  })
})

router.post('/comments',(req,res)=>{
  console.log(req.body);
  let user = req.session.user.user_id
  let {comments, post_seq} = req.body

  let sql = `INSERT INTO comments(post_seq, cmt_content, cmt_views, user_id)VALUES(?, ?, 1, ?);`
  
  conn.query(sql,[post_seq,comments,user],(err,rows)=>{
    if(rows.affectedRows>0){
      res.send(
        `'<script>location.href="http://localhost:3333/view?num=${post_seq}"</script>'`
      );
    }
  })
  
})

module.exports = router;