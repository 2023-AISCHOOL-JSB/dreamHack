const express = require('express');
const router = express.Router();
const conn = require('../config/database')

router.post('/add',(req,res)=>{
    console.log('목표 추가 라우터',req.body);

    let {title, routineList, start_date, end_date} = req.body
    routineList = JSON.stringify(routineList)
    
    let sql = `
    INSERT INTO goals (user_id, goal_title, goal_desc, start_at, end_at, created_at) 
    values('${req.session.user.user_id}', ?, ?,convert(?,date), convert(?,date),now())`
    conn.query(sql, [title,routineList, start_date,end_date], (err,rows)=>{
        console.log(err)
        console.log(rows)
        console.log("전송완료")
        res.send("<script>location.href='http://localhost:3333/mypage_todolist'</script>")
    })
})

module.exports = router;