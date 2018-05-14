var express = require('express');
var router = express.Router();
var uhConsts = require("../public/common/consts")
var wxAuth = require("../public/common/wxAuthorization")


router.post('/wx', function(req, res, next) {

    if (req.body.code != undefined) {
        console.log(req.body)
        let appID = uhConsts.AppID
        let appSecret = uhConsts.AppSecret;
        let code = req.body.code;
        //用这三个去换取登录信息 session_key + openid
        let wxAuthorizer = new wxAuth.wxAuthorization(appID, appSecret, code);
        wxAuthorizer.authorize().then (function (data) {
            //存储 open_id & session_key
            console.log(data);
            res.status(200).send({});
        }, function (data) {
           console.log(data);
           res.status(400).send({});
        });
    }
    else {
        //客户端发一个连接请求过来
        res.status(400).send({err:"param missing 'code' "});
    }
})

module.exports = router;
