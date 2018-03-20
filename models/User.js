const Model = require('./Model');
const passwordHash = require('password-hash');

class User extends Model {
    constructor() {
        super();
    }

    register(res, userName, email, password) {
        this.mongoClient.insertDocuments(this._collection, [{
            name: userName,
            email: email,
            password: passwordHash.generate(password)
        }], (result) => {
            if(result.result.n) {
                console.log("documents Inserted into " + this._collection);
                this.resultMSG.msg = "registered successfully.";
                this.resultMSG.data = result.insertedIds;
            }else{
                this.resultMSG.error = 1;
                this.resultMSG.msg = "registered failed.";
            }
            res.send( this.resultMSG );
        });
    }

    login(res, email, password) {
        this.mongoClient.findFillteredDocuments(this._collection, {
            email: email
        }, (result) => {
            if(result) {
                console.log(result);
                let savedPassword = result[0].password;
                if(passwordHash.verify(password, savedPassword)){
                    this.resultMSG.msg = "registered successfully.";
                    this.resultMSG.data = result[0];
                } else{
                    this.resultMSG.error = 1;
                    this.resultMSG.msg = "wrong password.";
                }
            }else{
                this.resultMSG.error = 1;
                this.resultMSG.msg = "email not found.";
            }
            res.send( this.resultMSG );
        });
    }
}

module.exports = User;