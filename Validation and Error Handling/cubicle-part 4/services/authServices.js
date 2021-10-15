let User = require('../models/User');
let bcrypt = require('bcrypt');

function register(username, password) {
    
    return User.findOne({ username })
    .then(user => {
        if(user) {
            throw new Error('Wrong username or password');
        } else {
            return User.create({ username, password });
        }
    })
    
};

function login(username, password) {

    return User.findOne({ username })
        .then(user => Promise.all([bcrypt.compare(password, user.password), user]))
        .then(([comp, user]) => {
            if (comp) {
                return user;
            } else {
                throw new Error('Wrong username or password');
            }
        });
};

module.exports = {
    register,
    login
}