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

router.post('/check',(req,res)=>{
    console.log(req.body);

    let {checked, goal_seq, list_len, due_date ,complete_percent} = req.body

    if (!Array.isArray(checked)){
        checked = [req.body.checked]   
    }

    console.log(checked.length);
    let checkedLen = checked.length

    let percent = parseFloat(complete_percent) + parseFloat(100/due_date *(checkedLen/list_len))

    if(percent>=100){
        percent = 100
    }

    console.log(percent);
    let sql = "update goals set complete_percent =? where goal_seq = ?"

    conn.query(sql, [percent,goal_seq],(err,rows)=>{
        if(rows.affectedRows>0){
            res.send(
              `'<script>alert("수고하셨습니다.");location.href="http://localhost:3333/todoList_content?num=${goal_seq}"</script>'`
            );
        }
        else{
            res.send(
              `'<script>alert("오류발생");location.href="http://localhost:3333/todoList_content?num=${goal_seq}"</script>'`
            );
        }
    })

})

router.post('/delete',(req,res)=>{
    console.log(req.body);

    let goal_seq = req.body.goal_seq;

    let sql = "delete from goals where goal_seq = ?"

    conn.query(sql,[goal_seq],(err,rows)=>{
        if(rows.affectedRows>0){
            res.send(
              `<script>alert("할일 삭제");location.href='http://localhost:3333/mypage_todolist'</script>`
            );
        }
    })
})

module.exports = router;