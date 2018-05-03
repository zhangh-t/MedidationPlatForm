var express = require('express');
var router = express.Router();
var account = require("../public/orm/dboperations/account")

var accountopr = new account.Account();

router.post('/', function(req, res, next) {
    //需要加密解密
    var accountInfo = req.body.accountinfo;
    if (accountInfo) {
        accountopr.checkExistance(accountInfo.username, function (data) {
            console.log(data);
            if (!data) {
                accountopr.add(accountInfo, function(data) {
                    res.status(200).send({state : 1, hint : "注册成功"});
                }, function (err) {
                    res.status(200).send({state : 0, hint : "注册失败"});
                })
            }
            else {
                res.status(200).send({state : 0 , hint : "用户名已存在"});
            }
        }, function () {
            res.status(200).send({state : 0 , hint : "数据库查询异常"});
        })
    }
})

module.exports = router;