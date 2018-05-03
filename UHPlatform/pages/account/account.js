// pages/account/account.js
var loginUtils = require("../../utils/loginUtils.js")
class uhAccountValidCheck {
  constructor() {

  }

  checkAccount(username, password) {
      return (username && username.length > 0) 
                && (password && password.length > 0);
  }

  checkPhoneNum(phoneNum) {
    
  }
} 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab1title:"账号密码",
    tab2title:"手机验证码",
    btnTitle : "",
    usernameHint: "",
    passwordHint: "",
    checkboxValue: "已阅读并同意协议",
    hiddenCheckBox: true,
    btnDisabled: false,
    mode: -1,
    errorDialogTitle : "错误",
    errorContent : "错误提示"
  },
  
  showError : function(msg, title) {
    this.setData({errorDialogTitle: title, errorContent: msg});
    let dialog = this.selectComponent('.errMsgDialog');
    if (dialog) dialog.show();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var accountMode = options.type;
     this.setData({ mode: accountMode});
     if (accountMode == 1) {
       //登录
       this.setData({btnTitle:"登录"});
     }
     else {
       //注册
       this.setData({btnTitle:"注册",
                     hiddenCheckBox : false,
                     btnDisabled : true});
       
     }
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

  onClick : function () {
    //tab click
  },

  onCheckBoxChange : function (e) {
    console.log(e);
    var checkboxgroup = e.detail.value;
    for (var i = 0 ; i < checkboxgroup.length; ++i) {
      if (checkboxgroup[i] == "agreeprotocol") {
        this.setData({ btnDisabled: false });
        return;
      }
    }
    this.setData({ btnDisabled: true });
  },
  onConfirmClicked : function (e){
      var username = e.detail.value.usernameinput;
      var password = e.detail.value.passwordinput;
      if (this.data.mode == 1) {
        //登录
        
      }
      else {      
        var checker = new uhAccountValidCheck;
        var that = this;
        if (checker.checkAccount(username, password)) {
           loginUtils.signin(username, password).then(function (data){
              //有返回
              console.log(data);
              if (data.state == 0) {
                console.log(12312312312312)
                that.showError(data.hint, "错误")
              }
              else {

              }
           }, function(data) {
              //异步登录失败
             that.showError(data.hint, "错误");
             console.log(that);
           })
        }
        else {
          that.showError("用户名或密码不能为空", "错误");
        }
      }
  },

  oErrorDialogConfirm : function () {
    let dialog = this.selectComponent('.errMsgDialog')
    dialog && dialog.hide();
  }
})