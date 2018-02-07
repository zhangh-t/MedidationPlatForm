
var urlNeedCheck = function (url) {
    return false;
};

var checkUserid = function (userid) {
    return true;
};

var sessionControl = function () {
    this.globalSessionCheck = function (req, res, next) {
        if (!urlNeedCheck(req.url)) {
            //如果URL不需要检查
            next();
        }
        else {
            if (req.session && req.session.userid) {
                if (checkUserid(req.session.userid)) {
                    //登录成功要往session里记userid
                    next();
                }
            }
            //如果没有登录, 跳转到登录
            res.redirect('www.baidu.com');
        }
    };
};


module.exports.sessionControl = new sessionControl();