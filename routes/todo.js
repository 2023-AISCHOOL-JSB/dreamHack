const express = require('express');
const router = express.Router();
const conn = require('../config/database')

router.post('/add',(req,res)=>{
    console.log('목표 추가 라우터',req.body);
})

module.exports = router;