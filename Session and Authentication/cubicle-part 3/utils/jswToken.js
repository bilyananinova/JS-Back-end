let jswt = require('jsonwebtoken');

let secret = 'mysupersecretsecret';

function createToken(user) {

    let payload = {
        id: user._id,
        username: user.username
    }

    return jswt.sign(payload, secret, { expiresIn: "1d" });
};

module.exports = { createToken };
