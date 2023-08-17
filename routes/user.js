const express = require('express');
const router = express.Router();
const conn = require('../config/database')


// 회원가입 기능 라우터
router.post('/join',(req,res)=>{
    let {id, pw, pw2, user_name, gender , birth_date } = req.body
    console.log('회원가입 기능 라우터',req.body)
    if (pw == pw2) {
        let sql =
          "insert into users(user_id, user_pw, user_name, user_gender, user_birthdate, joined_at) values(?,?,?,?,convert(?,date),now())";
        conn.query(sql, [id,pw,user_name,gender,birth_date], (err,rows)=>{
            console.log(rows)
            console.log("회원가입완료")
            res.send("<script>alert('회원가입완료');location.href='http://localhost:3333'</script>")
        })
    } else {

        res.send("<script>alert('비밀번호가 같지 않습니다!');location.href='http://localhost:3333/join'</script>")
    }  
})

// 로그인 기능 라우터
router.post('/login', (req, res) => {
    let { id, pw } = req.body;
    console.log('로그인 기능 라우터')

    let sql = "select * from users where user_id=? and user_pw=?"

    conn.query(sql, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            console.log('로그인 성공!', rows)
            req.session.user = rows[0]
            res.send("<script>alert('환영합니다!');location.href='http://localhost:3333'</script>")

        } else {
            console.log('로그인 실패!')
            res.send('<script>alert("로그인실패");location.href="http://localhost:3333"</script>')
        }
    })

    // 1. layout.html 에서 login Box 안의 데이터를 받아온다 (id,pw)
    // 2. 그 데이터들을 각각 id, pw 변수 안에 저장
    // 3. DB 연동해서 해당 id값과 pw값이 일치하는 데이터가 DB에 있는지 확인한다.
    // 4. 데이터가 존재한다면 로그인 성공 
    //      4-1) 로그인이 성공했다면, 해당 유저의 정보를 세션에 저장
    //      4-2) 환영합니다! alert => 메인으로 이동
    // 5. 데이터가 존재하지 않는다면 로그인 실패
})

// 로그아웃 기능 라우터
router.get('/logout', (req, res) => {
    // 1. 세션 삭제
    req.session.destroy()
    // 2. 메인페이지에 다시 접근
    res.send("<script>location.href='http://localhost:3333'</script>")
})

// 회원 탈퇴 기능 라우터
router.post('/user_out',(req,res)=>{
    let {user_id, user_pw} = req.body

    let sql4 = "delete from goals where user_id = ?"
    let sql3 = "update comments set user_id = '탈퇴한 유저' where user_id = ?"
    let sql2 = "update posts set user_id = '탈퇴한 유저' where user_id = ?;"
    
    let sql = "delete from users where user_id = ? and user_pw = ?"

    conn.query(sql4,[user_id],(err,rows)=>{
        conn.query(sql3, [user_id], (err, rows) => {
          conn.query(sql2, [user_id], (err, rows) => {
            conn.query(sql, [user_id, user_pw], (err, rows) => {
              if (rows.affectedRows > 0) {
                console.log("회원탈퇴 성공", rows);
                req.session.destroy();
                res.send(
                  "<script>alert('회원탈퇴 성공');location.href='http://localhost:3333'</script>"
                );
              } else {
                console.log("회원탈퇴 실패!");
                res.send(
                  '<script>alert("회원탈퇴실패");location.href="http://localhost:3333/user_out"</script>'
                );
              }
            });
          });
        });
    })
})

// 닉 변경
router.post('/mypage_manage',(req,res)=>{
    let user_name = req.body.user_name
    let user_id = req.session.user.user_id
    let sql = "update users set user_name= ? where user_id = ?"

    conn.query(sql,[user_name, user_id],(err, rows)=>{
        console.log(user_name)
        console.log(user_id);
        if (rows.affectedRows > 0) {
            console.log('유저이름 변경 성공', rows)
            res.send("<script>alert('변경 성공');location.href='http://localhost:3333'</script>")
            console.log(req.session.user_name)
        } 
    })
})


// 본인확인 기능 라우터
router.post('/account_check', (req, res) => {
    let { user_id, user_pw } = req.body;

    let sql = "select * from users where user_id=? and user_pw=?"
    if(user_id == req.session.user.user_id){
         conn.query(sql, [user_id, user_pw], (err, rows) => {
           if (rows.length > 0) {
             console.log("본인인증 성공!", rows);
             res.send(
               "<script>alert('확인 되었습니다!');location.href='http://localhost:3333/mypage_manage'</script>"
             );
           } else {
             console.log("본인인증 실패!");
             res.send(
               '<script>alert("아이디와 비밀번호를 확인하십시요");location.href="http://localhost:3333/account_check"</script>'
             );
           }
         });
    } else{
        console.log("본인인증 실패!");
        res.send(
          '<script>alert("아이디가 일치하지 않습니다");location.href="http://localhost:3333/account_check"</script>'
        );
    }
   

})


module.exports = router;