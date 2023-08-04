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

// 마이페이지 기능 라우터
router.get('/mypage_manage',(req,res)=>{
    console.log('회원정보수정',req.body)

    // 1. 내가 받아온 새 이름과 새 주소를 name, add 라는 변수에 넣을 것
    let {name, address} = req.body;

    // 2. id값? session 에서 가져오기
    let id = req.session.user.user_id;

    // 3. DB 연동
    let sql = `update users set user_id = ? `

    //  3-2) update set 을 이용해서 DB값 변경
   
})

module.exports = router;