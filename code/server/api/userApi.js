var models = require('../db');

var express = require('express');

var router = express.Router();

var mysql = require('mysql');


// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
  var params = req.body;
  var sql = 'insert into user(username, mode,password) values (?, ?, ?)';
  console.log(params);
  conn.query(sql, [params.username, params.mode,params.password], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询用户接口
// 登录判断
router.post('/queryUser', (req, res) => {
    var params = req.body;
    var sql = " select * from user where username = ? and mode = ? and password = ?";
    console.log(params);
    conn.query(sql, [params.username,params.mode,params.password], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result.length);
        if(result.length === 0 ){
          console.log("不存在该用户");
          jsonWrite(res, result);
        }
        else {
          console.log("存在该用户");
          jsonWrite(res, result);
        }
      }
    })
  });

  router.post('/deletevideo', (req, res) => {
    var params = req.body;
    var sql = " delete from playlist where videoname = '" + params.videoname + "'";
    console.log(params);
    conn.query(sql, [params.videoname], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(res);
        jsonWrite(res, result);
      }
    })
  });

router.get('/getvlist',(req,res)=>{
  conn.query('select videoname from playlist',function(err,result){
      if(err)
      {
        console.log(err)
      }
      console.log(typeof row)
      jsonWrite(res,result)
    })
})

// 增加用户接口
router.post('/addvideo', (req, res) => {
  var params = req.body;
  var sql = 'insert into playlist(VID, videoname) values (?, ?)';
  console.log(params);
  conn.query(sql, [params.VID, params.videoname], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

module.exports = router;

