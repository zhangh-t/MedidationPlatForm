var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '付出不亚于任何人的努力' });
})

router.post('/', function(req, res, next) {
  if (req.body.sessionid) {
      var sessionId = req.body.sessionid;
      console.log(sessionId);
      res.status(200).send({sessionState: 0});
  }
  else {
    //客户端发一个连接请求过来
      res.status(200).send({});
  }
})

module.exports = router;
