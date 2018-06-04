var express = require('express');
var router = express.Router();
var uhConsts = require("../public/common/consts")
var wxAuth = require("../public/common/wxAuthorization")
var uuid = require("node-uuid")
var redisClient = require("../public/common/redisClient").client
var loginStateMachine = require("../public/common/loginStateMachine")
const wxLogin = 0;
const uhLogin = 1;
const uhSigned = 0;
const uhUnSigned = 1;


function responseLogIn (openID, res) {
    loginStateMachine.wxLoginState(reply).then(function (datas) {
        if (datas.length > 0) {
            //注册过了
            res.status(200).send({key : sessionKey, state : uhSigned, usrid : datas[0].userid});
        }
        else {
            //没注册过
            res.status(200).send({key : sessionKey, state : uhUnSigned});
        }
    }, function() {
        res.status(400).send({});
    })
};


router.post('/wx', function(req, res, next) {
    console.log(req.session);
    if (req.session && req.session.sessStru) {
        //有session了
        //查看这个session对应的OpenID是谁
        let sessionKey = req.session.sessStru.key;
        redisClient.get(sessionKey, function (err, reply) {
            if (err ) {
                res.status(400).send({err:"openid not found"});
            }
            else  {
                if (reply) responseLogIn(reply, res);
                else res.status(200).send({key : sessionKey, state : uhUnSigned});
            }
        })
    }
    else
    {
        if (req.body.code != undefined) {
            console.log(req.body)
            let appID = uhConsts.AppID
            let appSecret = uhConsts.AppSecret;
            let code = req.body.code;
            //用这三个去换取登录信息 session_key + openid
            let wxAuthorizer = new wxAuth.wxAuthorization(appID, appSecret, code);
            wxAuthorizer.authorize().then (function (data) {
                let sessionKey = uuid.v4();
                req.session.sessStru = {type : wxLogin, key : sessionKey};    //记录下sessionkey
                redisClient.set(sessionKey, data.openid)    //存进redis
                responseLogIn(reply, res);
            }, function (data) {
                console.log(data);
                res.status(400).send({});
            });
        }
        else {
            //客户端发一个连接请求过来
            res.status(400).send({err:"param missing 'code' "});
        }
    }

})

module.exports = router;
