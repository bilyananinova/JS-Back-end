let User = require('../models/User');
let jwt = require('jsonwebtoken');

let { SECRET } = require('../config/constants');

exports.register = async function (name, username, password) {

    try {

        let existing = await User.findOne({ username });

        if (existing) {

            throw new Error('This username is taken!');
        }

        return User.create({ name, username, password });

    } catch (error) {

        throw new Error(error)
    }
}

exports.login = async function (username, password) {

    try {

        let user = await User.findOne({ username });

        if (!user) {
            throw new Error('Wrong username or password!');
        }

        let match = await user.validatePass(password);

        if (!match) {
            throw new Error('Wrong username or password!');
        }

        return user;

    } catch (error) {

        throw new Error(error);
    }
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