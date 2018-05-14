var request = require('request')

class wxAuthorization {
    constructor(appId, secret, code) {
        this.appId = appId;
        this.secret = secret;
        this.code = code;
    }
    authorize() {
        let that = this;
        return new Promise(function (resolve, reject) {
            request.get({
                uri: 'https://api.weixin.qq.com/sns/jscode2session',
                json: true,
                qs: {
                    grant_type: 'authorization_code',
                    appid: that.appId,
                    secret: that.secret,
                    js_code: that.code
                }
            }, (err, response, data) => {
                if (response.statusCode === 200) {
                    resolve(data);
                } else {
                    console.log(err);
                    reject(err);
                }
            })
        });
    }
}

module.exports.wxAuthorization = wxAuthorization;