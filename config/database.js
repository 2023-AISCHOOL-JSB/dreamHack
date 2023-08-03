// 외부 DB와 연결하려면 npm 모듈이 필요함 - mysql2
// 1) 설치 : npm i mysql2
// 2) require
const mysql = require('mysql2')

// 3) 나의 DB 정보 기재
// object 형태로 작성 -> 중괄호
let conn = mysql.createConnection({
  host: "project-db-stu3.smhrd.com",
  user: "Insa4_JSB_hacksim_2",
  password: "aishcool2",
  port: 3307,
  database: "Insa4_JSB_hacksim_2",
});

conn.connect() 

// 내 mysql 정보를 가지고 연결한 conn을 모듈화
module.exports = conn;