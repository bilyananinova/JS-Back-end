let User = require('../models/User');
let bcrypt = require('bcrypt');

let salt = 9;

function register(username, password) {

    return bcrypt.hash(password, salt)
        .then(hash => {
            let user = new User({ username, password: hash });
            return user.save();
        });
};

function login(username, password) {
    return User.findOne({ username })
        .then(user => Promise.all([bcrypt.compare(password, user.password), user]))
        .then(([comp, user]) => {
            if (comp) {
                return user;
            } else {
                throw { message: 'Cannot find username or password' }
            }
        })
};

module.exports = {
    register,
    login
}