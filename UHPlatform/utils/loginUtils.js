var consts = require("./consts.js")

function loginUtils() {
  //测试连接
  this.connectionTest = function (sucCallBack, failCallBack) {
    wx.request({
      url: consts.hostUrl,
      method: "POST",
      data: {},
      success: function (data) {
        sucCallBack();
      },
      fail: function (data) {
        failCallBack();
      }
    })
  }
  //问一下服务器sessionid还在不在
  this.sessionTest = function (id, callback) {
    wx.request({
      url: consts.hostUrl,
      method:"POST",
      data: {sessionid:id},
      success:function(data) {
        callback(1, data.data.sessionState);
      },
      fail:function(data) {
        callback(0,0);
      }
    })
  }
  //微信登录
  this.loginByWechat = function (callback) {
      
  }
  //用户密码登录
  this.loginByUsrnameAndPswd = function (usrname, pswd, callback) {

  }
  //注册
  this.signin = function (usrname, pswd) {
    return new Promise(function (resolve, reject) {
      //加上加密处理，还没研究要怎么做...
      wx.request({
        url: consts.hostSigninUrl,
        method: "POST",
        data: {accountinfo: {username: usrname, password: pswd }},
        success: function (data) {
          resolve(data.data)
        },
        fail: function (data) {
          var callbackOption = {
            state: 0,
            hint: "服务器没有响应"
          }
          reject(callbackOption);
        }
      })
    })
  }
}

module.exports = new loginUtils;