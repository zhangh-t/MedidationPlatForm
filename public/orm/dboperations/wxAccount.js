var uhDBOpr = require("../uhdb").uhDBOpr;
var baseOrm = require("../baseOrm").baseOrm
var sequelize = require("sequelize")

var accountmodel = uhDBOpr.define("wxAuthInfos", {
        'openid' : {
            type : sequelize.DataTypes.BIGINT,
            primaryKey : true,
            autoIncrement : true,
            field : "id"
        },
         userid : {
            type : sequelize.DataTypes.BIGINT,
            field : "userid"
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

class wxAccount extends baseOrm {
    constructor() {
        super(accountmodel);
    }

    checkExistance(openID, rescallback, errorcallback) {
        super.findone({where : {openID : openID}}, rescallback, errorcallback);
    }
}

exports.Account = wxAccount;



