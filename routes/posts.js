const express = require('express');
const router = express.Router();
const conn = require('../config/database')




router.post('/write',(req,res)=>{
  console.log(req.body)
  let { post_title, post_conent } = req.body;
  // console.log(`${req.session.user.user_id}`)

  let sql = `INSERT INTO posts (post_title, post_conent, post_file, posted_at, post_views, post_likes, user_id) VALUES (?, ?, 'post_file 1', NOW(), 1, 1, '${req.session.user.user_id}');`

  console.log(sql)
  conn.query(sql, [post_title, post_conent], (err, rows) => {
    
    if(rows.affectedRows > 0){
      console.log('성공')
      res.send('<script>location.href="http://localhost:3333/view"</script>')
    }
  })
})

router.get('/community',(req,res)=>{
  let sql = "select * from posts"
  conn.query (sql,(err,rows)=>{
    res.render("community",{list : rows})
  })
})



module.exports = router;