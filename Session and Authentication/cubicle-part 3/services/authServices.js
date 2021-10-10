let User = require('../models/User');

let bcrypt = require('bcrypt');

let salt = 9;


function register(username, password) {

    bcrypt.hash(password, salt)
        .then(hash => {
            let user = new User({ username, password: hash });
            return user.save();
        })

};


function login(username, password) {
    User.findOne({ username })
        .then(user => {
            return bcrypt.compare(password, user.password)
                .then(isValid => {
                    if (isValid) {
                        return user;
                    } else {
                        throw { message: "Cannot find username or password!" };
                    }
                })
        })
};

module.exports = {
    register,
    login
}