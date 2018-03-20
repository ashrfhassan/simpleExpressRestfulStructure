const User = require('../models/User');

class AuthController {
    constructor() {
        this.user = new User();
    }

    register(req, res){
        this.user.register(res, req.body.name, req.body.email, req.body.password);
    }

    login(req, res){
        this.user.login(res, req.body.email, req.body.password);
    }

}

module.exports = AuthController;