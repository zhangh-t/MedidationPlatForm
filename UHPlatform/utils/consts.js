function UHConsts() {
  this.hostUrl = "http://127.0.0.1:9527/";
  this.hostSigninUrl = this.hostUrl + "signin";
  this.wxloginUrl = this.hostUrl+"login/wx";
  this.staticRcUrl = {
    indexLoadingimg : this.hostUrl + "images/loadingimg.png",
    indexLoadingslip : this.hostUrl + "images/loadingslip.png",
    signInHintimg : this.hostUrl + "images/question.png",
    authorizeHintimg: this.hostUrl + "images/authorize.png",
  };
  this.constFiels = {
    fldSessionID : "sessionid"
  };
  this.constFiels = {
    fldSessionID : "sessionid"
  };
  this.redirectUrl = {
    loginUrl: '../login/login',
    conectFaildUrl: '../error/error?type=1',
    accountUrlForLogin: '../account/account?type=1',
    accountUrlForSignin: '../account/account?type=2'
  }
}

module.exports = new UHConsts;