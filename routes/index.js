const express = require("express");
const router = express.Router();
const conn = require("../config/database");

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

// 커뮤니티 페이지 이동


router.get("/community/", (req, res) => {
  let page = req.query.page;
  console.log(page);
  let sql =
    "select post_seq, post_title, post_conent, date_format(posted_at, '%Y-%m-%d') as posted_at, post_views, post_likes, user_id  from posts order by post_seq desc";
  if (page == undefined){
    page = 1;
  }
  if (page <= 0) {
    page = 1;
  }
  
  conn.query(sql, (err, rows) => {
    let allPosts = rows.length;
    let itemCntPerPage = 5; // 한 페이지에 보이는 게시글 수
    // let itemCntPerPagingNum = 5; // 한 번에 보이는 페이징 넘버 수
    let totalPage = allPosts % itemCntPerPage != 0 ? parseInt(allPosts / itemCntPerPage)+1 : parseInt(allPosts / itemCntPerPage);
    // console.log("totalPage : " + totalPage);
    let endPageNum = (parseInt((page - 1) / itemCntPerPage) + 1) * itemCntPerPage;
    let term = parseInt((page - 1) / itemCntPerPage);
    // console.log("endPageNum : " + endPageNum);
    let startPageNum = endPageNum - itemCntPerPage + 1;

    if (endPageNum >= totalPage) {
      endPageNum = totalPage;
    }



    let sql2 =
      "select post_seq, post_title, post_conent, date_format(posted_at, '%Y-%m-%d') as posted_at, post_views, post_likes, user_id  from posts order by post_seq desc limit ? ,5";
    postIndex = (page-1) * itemCntPerPage;
    conn.query(sql2,[postIndex],(err, rows)=>{
      res.render("community", {
        obj: req.session.user,
        list: rows,
        term: term,
        totalPage: totalPage,
        endPageNum: endPageNum+1,
        startPageNum: startPageNum,
      });
    }) 
  });
});

// 작성한 게시글 내용 페이지 이동
router.get('/view', (req, res) => {
  console.log(req.query);

  let sql =
    "select post_seq, post_title, post_conent, post_file, date_format(posted_at, '%Y-%m-%d %h:%i:%s') as posted_at, post_views, post_likes, user_id from posts where post_seq = ?";


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

// 커뮤니티 게시글 작성 페이지 이동
router.get('/write', (req, res) => {
  res.render("write",{obj : req.session.user});
});

//게시글 수정 페이지 이동
router.get('/edit', (req, res) => {
  res.render("edit",{obj : req.session.user});
});

module.exports = router;