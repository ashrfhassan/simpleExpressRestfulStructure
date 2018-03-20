const Mongo = require('../services/MongoDB');

class Model {
    constructor() {
        this.mongoClient = new Mongo();
        this._collection = this.constructor.name.toLowerCase() + 's';
        this.resultMSG = {
            error: 0,
            msg:"request done successfully.",
            data:{}
        }
    }

}

module.exports = Model;