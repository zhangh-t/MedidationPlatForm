function UHConsts() {
  this.hostUrl = "http://127.0.0.1:4440/";
  this.hostSigninUrl = this.hostUrl + "signin"
  this.staticRcUrl = {
    indexLoadingimg : this.hostUrl + "images/loadingimg.png",
    indexLoadingslip : this.hostUrl + "images/loadingslip.png",
    signInHintimg : this.hostUrl + "images/question.png",
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