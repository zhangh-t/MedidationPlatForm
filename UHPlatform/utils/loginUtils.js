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
  this.loginByWechat = function () {
      return new Promise(function (resolve, reject) {
         wx.login({
           success: function (res) {
             if (res.code) {
                //获取用户信息
                //先问一下有没有权限
                wx.getSetting({
                  success: function (data) {
                    if (!data.authSetting['scope.userInfo']) {
                      reject({ error: "用户信息未授权，请点击登录按钮下方的授权按钮." });
                    }
                    else {
                      wx.getUserInfo({
                        success: function (data) {
                          withCredentials: true,
                            wx.request({
                              url: consts.wxloginUrl,
                              method: 'POST',
                              header: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'cookie': wx.getStorageSync("sessionid")//读取cookie
                              },
                              data: {
                                code: res.code,
                                encryptedData: data.encryptedData,
                                iv: data.iv
                              },
                              success: function (data) {
                                if (data.statusCode != 200) {
                                  reject({ error: "向服务器发情请求失败,请尝试用户名密码登录." });
                                }
                                else {
                                  console.log(data)
                                  wx.setStorageSync("sessionid", data.header["set-cookie"])
                                  //登录成功，拿到session、和状态，如果是新用户，导航到注册页面
                                  resolve(data)
                                }
                              },
                              fail: function (res) {
                                reject({ error: "向服务器发情请求失败,请尝试用户名密码登录." });
                              }
                            })
                        },
                        fail: function (msg) {
                          console.log(msg);
                          reject({ error: "获取用户信息失败,请尝试用户名密码登录." });
                        }
                      })
                    }
                  },
                  fail: function (res) {
                    reject({ error: "获取微信设置失败,请尝试用户名密码登录." });
                  }
                })
             }
             else {
               reject({error:res.errMsg});
             }
           },
           fail: function (res) {
             reject({ error: "微信登录失败,请尝试用户名密码登录."});
           }
         })
      });
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