
//增、删、改、查的基础ORM操作
exports.baseOrm = class baseOrm {
    constructor (tableModel) {
        this.tablemodel = tableModel;
    }

    add(data, suc = null, fail = null) {
        this.tablemodel.create(data).then(function (result) {
            if (suc) {
                suc(result);
            }
        }).catch(function (err) {
            console.log(err);
            if (fail) {
                fail(err);
            }
        })
    }

    del(condition, suc = null, fail = null) {
        this.tablemodel.destroy({
            where : condition
        }).then(function (result) {
            //result = undefined
            if (suc) {
                suc(result);
            }
        }).catch(function (err) {
            console.log(err);
            if (fail) {
                fail(err);
            }
        })
    }

    update(data, condition, suc = null, fail = null) {
        this.tablemodel.update(data, {where : condition}).then(function (result) {
            //Promise<Array<affectedCount|affectedRows>>
            if (suc) {
                suc(result);
            }
        }).catch(function (err) {
            console.log(fail);
            if (fail) {
                fail(err);
            }
        })
    }

    findone(condition, suc = null, fail = null) {
        this.tablemodel.findOne(condition).then(function (result) {
            //result = singleinstance
            if (suc) {
                suc(result)
            }
        }).catch(function (err) {
            console.log(err);
            if (fail) {
                fail(err);
            }
        });
    }

    findall(condition, suc = null, fail = null) {
        this.tablemodel.findAll(condition).then(function (result) {
            if (suc) {
                //result = array(results)
                suc(result);
            }
        }).catch(function (err) {
            console.log(err);
            if (fail) {
                fail(err);
            }
        })
    }

    findbyid(id, suc = null, fail = null) {
        this.tablemodel.findById(id).then(function (result) {
            if (suc) {
                suc (result);
            }
        }).catch(function (err) {
            console.log(err);
            if(fail) {
                fail(err);
            }
        })
    }
}