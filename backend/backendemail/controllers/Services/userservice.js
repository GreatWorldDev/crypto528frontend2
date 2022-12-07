// import add from "./Validator/emailValidator";
const { User } = require('../../models/user');

class UserService {

    validateEmail(email) {
        const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regex_pattern.test(email)) {
            return true;
        }
       return false;
    }

    async findByEmail(email) {
        const user = User.findOne({ email })
        
        return user
    }
}

module.exports = new UserService();
