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
    console.log(this.data.signinhintimage)
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

  onPopAccountDialog: function (title, content) {
    let loginDialog = this.selectComponent('.wxc-dialog')
    if (loginDialog) {
      this.setData({
        dialogtitle: title,
        dialogcontent: content
      });
      loginDialog.show();
      var intervalCount = 0;
      var timer = setInterval(() => {
        ++intervalCount;
        if (intervalCount == 100) {
          clearInterval(timer);
          this.setData({ opacity: 1.0 })
        }
        else {
          this.setData({
            opacity:
            this.data.opacity + 0.01
          })
        }
      }, 10);
    }
  },

  //微信账户登录流程
  onLoginByWechat: function () {
    //微信登录并记录sessionid
    loginUtils.loginByWechat(this);
  },

  //用户名密码登录流程
  onLoginByUsrnameAndPsw: function () {
    this.setData({confirmtext:"登录"})
    this.setData({dialogMode:0});
    this.onPopAccountDialog("登录", "请输入用户名密码")
  },

  //输入用户名时
  onUsrnameInput: function (e) {
    this.setData({
      usrname: e.detail.value
    })
  },

  //输入密码时
  onPswdInput: function (e) {
    this.setData({
      pswd: e.detail.value
    })
  },

  //确定
  onConfirm: function () {
    var page = this;
    var checkInput = function () {
      return page.data.usrname != ""
        && page.data.pswd != "";
    }

    var dialogHint = function (suchint, hintcontent) {
      page.setData({
        dialogcontent: hintcontent,
        dialogcontentcolor: suchint ? "#08af5b" : "#ff5777"
      })
    }
    if (!checkInput()) {
      dialogHint(false, "用户名密码不能为空");
    }
    let loginDialog = this.selectComponent('.wxc-dialog')
    var accepted = false;
    var callback = function (data) {
      if (data.state == 0) {
        //失败或错误
        dialogHint(false, data.hint);
      }
      else {
        //成功
        if (data.hint) {
          dialogHint(true, data.hint);
          setTimeout(() => {
            loginDialog.hide();
            page.setData({ 
              opacity: 0.0,
              dialogcontentcolor: "#353535"});
          }, 2000);
        }
        else {
          loginDialog.hide();
          page.setData({ 
            opacity: 0.0,
            dialogcontentcolor: "#353535" });
        }
      }
      page.setData({
        usrnamevalue : "",
        pswdvalue: "",
      });
    }
    if (this.data.dialogMode == 0)    //登录模式
      this.loginByUsrNameAndPswd(callback);
    else
      this.signin(callback);    
  },

  //取消
  onCancel: function () {
    let loginDialog = this.selectComponent('.wxc-dialog')
    loginDialog.hide();
    this.setData({ 
      opacity: 0.0,
      dialogcontentcolor: "#353535" });
    this.setData({
      usrnamevalue: "",
      pswdvalue: "",
    })
  },

  //注册
  onSigninTaped: function () {
    this.setData({ confirmtext: "注册" })
    this.setData({ dialogMode: 1 });
    this.onPopAccountDialog("注册", "请填写用户名密码")
  },
  
  //微信登录
  longinByWechat: function () {

  },

  //用户名密码登录
  loginByUsrNameAndPswd: function (callback) {
    loginUtils.loginByUsrnameAndPswd(this.data.usrname, this.data.pswd)
  },

  //注册
  signin: function (callback) {
    loginUtils.signin(this.data.usrname, this.data.pswd, callback)
  }
})