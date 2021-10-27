let User = require('../models/User');
let jwt = require('jsonwebtoken');

let { SECRET } = require('../config/constants');

exports.register = function ( email, password, rePassword, gender) {
    try {

        return User.create({  email, password, rePassword, gender });

    } catch (err) {

        return err;
    }
}

exports.login = async function (email, password) {

    let user = await User.findOne({ email });

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
        email: user.email,
        name: user.name,
        username: user.username
    };

    // return jwt.sign(payload, SECRET, {
    //     expiresIn: '4h'
    // });

    return jwt.sign(payload, SECRET);
}