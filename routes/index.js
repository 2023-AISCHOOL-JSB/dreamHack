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

// 커뮤니티 페이지 이동 (http://localhost:3333/community) 이동했을떄
router.get('/community', (req, res) => {
  res.render("community",{obj : req.session.user}); //views 파일 안의 community.html 나타내줌
});

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
module.exports = router;