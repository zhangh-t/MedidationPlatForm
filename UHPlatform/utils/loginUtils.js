var consts = require("./consts.js")

function loginUtils() {
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

  this.loginByWechat = function (callback) {
      
  }

  this.loginByUsrnameAndPswd = function (usrname, pswd, callback) {

  }

  this.signin = function (usrname, pswd, callback) {
    wx.request({
      url: consts.hostSigninUrl,
      method: "POST",
      data: {usrname : usrname, pswd : pswd},
      success: function (data) {
        var callbackOption = {
          state : 1,
          hint : "注册成功!"
        }
        callback(callbackOption);
      },
      fail: function (data) {
        var callbackOption = {
          state: 0,
          hint: "连接服务器失败..."
        }
        callback(callbackOption);
      }    
    })
  }
}

module.exports = new loginUtils;