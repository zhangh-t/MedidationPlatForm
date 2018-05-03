var uhDBOpr = require("../uhdb").uhDBOpr;
var baseOrm = require("../baseOrm").baseOrm
var sequelize = require("sequelize")

var accountmodel = uhDBOpr.define("authInfos", {
       'id' : {
           type : sequelize.DataTypes.BIGINT,
           primaryKey : true,
           autoIncrement : true,
           field : "id"
       },
       'username' : {
           type : sequelize.DataTypes.CHAR,
           field : "username"
       },
       'password' : {
           type : sequelize.DataTypes.CHAR,
           field : "password"
       },
       'createdAt' : {
           type : sequelize.DataTypes.DATE,
           defaultValue:  sequelize.DataTypes.NOW,
           field : "createdAt"
       }
    }, {
        timestamps : false,
        engine : "InnoDB",
        initialAutoIncrement : 10000}
    );

class account extends baseOrm {
    constructor() {
        super(accountmodel);
    }

    checkExistance(username, rescallback, errorcallback) {
        super.findone({where : {username : username}}, rescallback, errorcallback);
    }
}

exports.Account = account;



