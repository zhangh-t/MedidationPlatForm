var sequelize = require("sequelize");
var config = require("config");

class uhDB {
    constructor(dbconfig) {
        try {
            let dbOptions = {};
            dbOptions.host = dbconfig.host;
            dbOptions.port = dbconfig.port;
            dbOptions.pool = {};
            dbOptions.pool.maxConnections = dbconfig.max;
            dbOptions.pool.minConnections = 0;
            dbOptions.pool.maxIdleTime = 1000 * 60 * 60;
            dbOptions.dialect = "mysql";
            dbOptions.timezone = "+08:00";
            this.sequelize = new sequelize(dbconfig.dbname,
                dbconfig.usrname,
                dbconfig.pswd,
                dbOptions
            );

        }
        catch (err){
            console.log(err);
            throw err;
        }
    }

    define(modelname, properties) {
        var res = this.sequelize.define(modelname, properties);
        this.sequelize.sync();
        return res;
    }
}

var dbconfig = config.get("dbconfig");
exports.uhDBOpr = new uhDB({
        dbname      : dbconfig.dbname,
        usrname     : dbconfig.usrname,
        pswd        : dbconfig.pswd,
        host        : dbconfig.host,
        port        : dbconfig.port,
        max         : dbconfig.max,
        }); //东八时区
exports.uhDB = uhDB;



