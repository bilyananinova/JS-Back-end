let User = require('../models/User');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

let secret = 'mysecret';

exports.register = function (name, username, password) {
    return User.create({ name, username, password });
}

exports.login = function (username, password) {

    return User.findOne({ username })
        .then(user => Promise.all([bcrypt.compare(password, user.password), user]))
        .then(([match, user]) => {
            if(match) {
                return user;
            } else {
                throw new Error('Wrong username or password');
            }
        });
}

exports.jsonWebToken = function (user) {

    let payload = {
        id: user._id,
        username: user.username,
        name: user.name
    };

    return jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
}