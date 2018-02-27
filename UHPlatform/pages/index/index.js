//index.js
//获取应用实例
const app = getApp()
var loginUtils = require("../../utils/loginUtils.js")
var consts = require("../../utils/consts.js")
var redirectTo = function (redirectUrl) {
  wx.redirectTo({
    url: redirectUrl
  })
}

Page({
  data: {
    loadingimg: consts.staticRcUrl.indexLoadingimg,
    loadingslip: consts.staticRcUrl.indexLoadingslip,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    //检查一下连接
    let page = this;
    let connectionSucCallBack = function () {
      //校验session
      var sessionid = wx.getStorageSync(consts.constFiels.fldSessionID);
      if (sessionid == "") {
        //没有sessionid 跳转到登录
        redirectTo(consts.redirectUrl.loginUrl)
      }
      else {
        //否则检验登录状态
        loginUtils.sessionTest(sessionid, (serverState, sessionState) => {
          if (serverState == 0) {
            //服务器挂了
            redirectTo(consts.redirectUrl.conectFaildUrl)
          }
          else {
            if (sessionState == 0) {
              //连接失效了, 登录一下
              redirectTo(consts.redirectUrl.loginUrl)
            }
            else {
              //连接没失效, 直接进入
            }
          }
        })
      }
    }
    
    let connectionFailCallBack = function () { 
      redirectTo(consts.redirectUrl.conectFaildUrl)
    }
    
    loginUtils.connectionTest(connectionSucCallBack,
      connectionFailCallBack);
    
  }
})
