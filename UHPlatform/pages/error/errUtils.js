function errConfigUtils() {
  this.config = function (type) {
    if (type == 1) {
      //找不到服务器
      return {
        type:"REQUEST_ERROR",
        title:"连接服务器失败,o(╥﹏╥)o",
        button:"重试"
      }
    }
  }
}

module.exports = new errConfigUtils;