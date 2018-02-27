// pages/login/login.js
var loginUtils = require("../../utils/loginUtils.js")
var consts = require("../../utils/consts.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0.1,
    usrname:"",
    pswd:"",
    usrnamevalue: "",
    pswdvalue: "",
    dialogtitle: "",
    dialogcontent: "",
    confirmtext:"",
    signinhintimage: consts.staticRcUrl.signInHintimg,
    dialogMode : -1,
    dialogcontentcolor: "#353535",
    showloading : false,
    loadingimg: consts.staticRcUrl.indexLoadingimg,
    loadingslip: consts.staticRcUrl.indexLoadingslip
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //微信账户登录流程
  onLoginByWechat: function () {
    //微信登录并记录sessionid
    loginUtils.loginByWechat(this);
  },

  //用户名密码登录流程
  onLoginByUsrnameAndPsw: function () {
    wx.redirectTo({
      url: consts.redirectUrl.accountUrlForLogin,
    })
  },
  onSigninTaped: function () {
    wx.redirectTo({
      url: consts.redirectUrl.accountUrlForSignin,
    })
  }
})