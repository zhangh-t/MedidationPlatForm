var wxAccountInfo = new require("../orm/dboperations/wxAccount").wxAccount;

class loginStateMachine {
    constructor() {}

    wxLoginState(userOpenid) {
        //1. 检查是不是存在
        return new Promise(function(resolved, rejected) {
            wxAccountInfo.checkExistance(userOpenid, resolved, rejected);
        });
    }

    uhLoginState(usrname, pswd) {

    }
}

module.exports = new loginStateMachine()