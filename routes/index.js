const express = require("express");
const router = express.Router();

// 메인페이지 (http://localhost:3333/) 이동했을떄 
router.get('/',(req,res)=>{
    res.render('main',{obj : req.session.user}) //views 파일 안의 main.html 나타내줌
    
})

// 드림보드 페이지 이동 (http://localhost:3333/dreamboard) 이동했을떄
router.get('/dreamboard',(req,res)=>{
  res.render("dreamboard",{obj : req.session.user}); //views 파일 안의 dreamboard.html 나타내줌
})

// 로그인 페이지 이동 (http://localhost:3333/login) 이동했을떄
router.get('/login',(req,res)=>{
  res.render("login"); //views 파일 안의 login.html 나타내줌
})

// 회원가입 페이지 이동 (http://localhost:3333/join) 이동
router.get('/join',(req,res)=>{
  res.render("join"); //views 파일 안의 join.html 나타내줌
})

// 마이페이지 계정관리 페이지이동 (http://localhost:3333/maypage_mange) 이동
router.get('/mypage_manage',(req,res)=>{
  res.render("mypage_manage",{obj : req.session.user});
})

// 마이페이지 투두리스트 페이지이동
router.get('/mypage_todolist',(req,res)=>{
  res.render("mypage_todolist",{obj : req.session.user});
})

// 투두리스트 작성
router.get('/todolist_write',(req,res)=>{
  // 웹페이지에서 뛰우는 주소
  res.render("todolist_write",{obj : req.session.user});
  // html 이름   {객체 :  }
})

// 투두리스트 본문 내용
router.get('/todolist',(req,res)=>{
  res.render("todolist",{obj : req.session.user});
})

// 회원 탈퇴 페이지 이동
router.get('/user_out', (req, res) => {
  res.render("user_out",{obj : req.session.user});
});

module.exports = router;