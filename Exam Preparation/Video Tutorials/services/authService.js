let User = require('../models/User');
let jwt = require('jsonwebtoken');

let { SECRET } = require('../config/constants');

exports.register = function (username, password) {
    try {

        return User.create({ username, password });

    } catch (err) {

        return err;
    }
}

exports.login = async function (username, password) {

    let user = await User.findOne({ username });

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    let match = await user.validatePass(password);

    if (!match) {
        throw new Error('Wrong username or password!');
    }

    return user;
}

exports.jsonWebToken = function (user) {

    let payload = {
        id: user._id,
        username: user.username,
        name: user.name
    };

    return jwt.sign(payload, SECRET, {
        expiresIn: '4h'
    });
}