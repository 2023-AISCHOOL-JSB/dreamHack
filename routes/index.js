const express = require("express");
const router = express.Router();
const conn = require("../config/database");

// 메인페이지 (http://localhost:3333/) 이동했을떄 
router.get('/',(req,res)=>{
    res.render('main',{obj : req.session.user}) //views 파일 안의 main.html 나타내줌
    
})

// 드림보드 페이지 이동 (http://localhost:3333/dreamboard) 이동했을떄
router.get('/dreamboard',(req,res)=>{
  res.render("index", { obj: req.session.user }); // views폴더에서 inndex.html 렌더
  // res.render("dreamboard",{obj : req.session.user}); //views 파일 안의 dreamboard.html 나타내줌
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
  let page = req.query.page

  let sql = "select goal_seq, goal_title, complete_percent from goals where user_id = ?";

  if(page == undefined){
    page = 1;
  }
  if(page <=0){
    page = 1;
  }

  conn.query(sql,[req.session.user.user_id],(err, rows)=>{
    let allPosts = rows.length;
    let itemCntPerPage = 5; // 한 페이지에 보이는 게시글 수
    let itemCntPerPagingNum = 5; // 한 번에 보이는 페이징 넘버 수
    let totalPage = allPosts % itemCntPerPage != 0 ? parseInt(allPosts / itemCntPerPage) + 1 : parseInt(allPosts / itemCntPerPage);
    let endPageNum = (parseInt((page - 1) / itemCntPerPagingNum) + 1) * itemCntPerPagingNum;
    let term = parseInt((page - 1) / itemCntPerPagingNum);
    let startPageNum = endPageNum - itemCntPerPagingNum + 1;

    if(endPageNum >= totalPage) {
      endPageNum = totalPage;
    }
    let sql2 = "select goal_seq, goal_title, complete_percent from goals where user_id = ? order by goal_seq desc limit ? ,?";
    let postIndex = (page - 1) * itemCntPerPage;
    let user = req.session.user.user_id;
    conn.query(sql2,[user,postIndex,itemCntPerPage],(err,rows)=>{
      res.render("mypage_todolist", { 
        obj: req.session.user,
        goals: rows,
        term : term,
        totalPage : totalPage,
        endPageNum : endPageNum + 1,
        startPageNum : startPageNum
       });
    })
  })

})

// 투두리스트 작성
router.get('/todolist_write',(req,res)=>{
  // 웹페이지에서 뛰우는 주소
  res.render("todolist_write",{obj : req.session.user});
  // html 이름   {객체 :  }
})

// 회원 탈퇴 페이지 이동
router.get('/user_out', (req, res) => {
  res.render("user_out",{obj : req.session.user});
});

// 커뮤니티 페이지 이동, 페이징 포함
router.get("/community/", (req, res) => {
  let page = req.query.page;
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
    let itemCntPerPagingNum = 5; // 한 번에 보이는 페이징 넘버 수
    let totalPage = allPosts % itemCntPerPage != 0 ? parseInt(allPosts / itemCntPerPage)+1 : parseInt(allPosts / itemCntPerPage);
    let endPageNum = (parseInt((page - 1) / itemCntPerPagingNum) + 1) * itemCntPerPagingNum;
    let term = parseInt((page - 1) / itemCntPerPagingNum);
    let startPageNum = endPageNum - itemCntPerPagingNum + 1;

    if (endPageNum >= totalPage) {
      endPageNum = totalPage;
    }



    let sql2 =
      "select post_seq, post_title, post_conent, date_format(posted_at, '%Y-%m-%d') as posted_at, post_views, post_likes, user_id  from posts order by post_seq desc limit ? ,?";
    let postIndex = (page-1) * itemCntPerPage;

    conn.query(sql2,[postIndex,itemCntPerPage],(err, rows)=>{
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

// 조회수 알고리즘을 위한 커뮤니티 페이지 이동
router.get('/count', (req, res) => {
  let sql1 =`
  select post_views
  from posts
  where post_seq = ?
  `
  let post_num = req.query.num;
  var postView = 0;
  conn.query(sql1, [post_num], (err, rows) => {
    postView = rows[0].post_views + 1;

    let sql = `
    UPDATE posts
       SET
        post_views = ?
    WHERE post_seq = ?`
    conn.query(sql, [postView, post_num], (err, rows) => {
      res.redirect("view?num="+String(post_num))
    })
  })
});

// 작성한 게시글 내용 페이지 이동
router.get('/view', (req, res) => {
  let sql =
    "select post_seq, post_title, post_conent, post_file, date_format(posted_at, '%Y-%m-%d %h:%i:%s') as posted_at, post_views, post_likes, user_id from posts where post_seq = ?";
    let post_num = req.query.num;
  // sql에 쿼리문이 들어간다 ? 는 변수이다
  conn.query(sql,[post_num],(err,rows)=>{
    
    // conn 은 require('../config/database') 이다
    // query는 conn에 있는 메서드이다. sql문을 사용할 수 있게해준다.
    // rows 에는 32번째 줄에 sql의 결과물이 들어간다.
    // req.session.user 정보가 obj라는 이름으로 view에 넘어간다.
    // rows 정보가 postContent라는 이름으로 view에 넘어간다.
    let sql2 = "select * from comments where post_seq = ?"

    conn.query(sql2,[post_num],(err,rows2)=>{
      res.render("view",{
        obj : req.session.user , 
        postContent : rows,
        postComment : rows2
      });
    })
  })

  
  //  session = 로그인할 때 생기는 회원 정보. 
});

// 커뮤니티 게시글 작성 페이지 이동
router.get('/write', (req, res) => {
  res.render("write",{obj : req.session.user});
});

//게시글 수정 페이지 이동
router.get('/edit', (req, res) => {

  let sql = "select * from posts where post_seq = ?"

  conn.query(sql,[req.query.num],(err,rows)=>{
    res.render("edit", { obj: req.session.user, postInfo: rows });
  })

});

// 투두리스트 사용자별 콘텐츠 내용
router.get('/todolist_content',(req,res)=>{
  let goal_num = req.query.num 
  let sql =
    "select goal_seq, user_id, goal_title, goal_desc, datediff(end_at, start_at) as due_date, date_format(created_at, '%Y-%m-%d %h:%i:%s') as created_at, complete_percent from goals where goal_seq = ?";
  conn.query(sql,[goal_num],(err,rows)=>{
    rows[0].goal_desc = JSON.parse(rows[0].goal_desc);
    res.render("todolist_content", { obj: req.session.user , todoList: rows , index : req.query.index});
  })
})

//마이드림보드 리스트
router.get('/dreamboard_list',(req,res)=>{
  let user = req.session.user.user_id;
  let sql = "select my_vision_seq, my_vision_title, vision_img from vision_boards_saved where user_id = ? ORDER BY my_vision_seq desc"

  conn.query(sql,[user],(err, rows)=>{

    console.log("이미지:" + rows.vision_img);
    res.render("dreamboard_list", { obj: req.session.user , dreamBoardList : rows});
  })
})

// 마이페이지 계정확인 페이지 이동
router.get('/account_check',(req,res)=>{
  res.render("account_check",{obj : req.session.user});
})

// 내가 쓴 게시글 페이지 이동 (http://localhost:3333/dreamboard) 이동했을떄
router.get('/my_Community',(req,res)=>{
  let page = req.query.page;

  let sql =
    "select post_seq, post_title, post_conent, date_format(posted_at, '%Y-%m-%d') as posted_at, post_views, post_likes, user_id  from posts where user_id = ? order by post_seq desc"
  if(page == undefined){
    page = 1;
  } 
  if (page <=0) {
    page = 1;
  }
  conn.query(sql,[req.session.user.user_id],(err,rows)=>{
    let allPosts = rows.length;
    let itemCntPerPage = 5; // 한 페이지에 보이는 게시글 수
    let itemCntPerPagingNum = 5; // 한 번에 보이는 페이징 넘버 수
    let totalPage = allPosts % itemCntPerPage != 0 ? parseInt(allPosts / itemCntPerPage)+1 : parseInt(allPosts / itemCntPerPage);
    let endPageNum = (parseInt((page - 1) / itemCntPerPagingNum) + 1) * itemCntPerPagingNum;
    let term = parseInt((page - 1) / itemCntPerPagingNum);
    let startPageNum = endPageNum - itemCntPerPagingNum + 1;

    if(endPageNum >= totalPage) {
      endPageNum = totalPage;
    }
    let sql2 =
      "select post_seq, post_title, post_conent, date_format(posted_at, '%Y-%m-%d') as posted_at, post_views, post_likes, user_id  from posts where user_id = ? order by post_seq desc limit ? ,?";
    let postIndex = (page-1) * itemCntPerPage;
    let user = req.session.user.user_id;
    conn.query(sql2,[user,postIndex,itemCntPerPage],(err,rows)=>{
      res.render("my_Community", {
        obj: req.session.user,
        list: rows,
        term: term,
        totalPage: totalPage,
        endPageNum: endPageNum + 1,
        startPageNum: startPageNum,
      });
    })
  })



})

module.exports = router;