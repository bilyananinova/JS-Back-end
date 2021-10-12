let jswt = require('jsonwebtoken');

let secret = 'mysupersecretsecret';

function isLogged(req, res, next) {
    let token = req.cookies.jwt;

    if (!token) {
        return next();
    }

    jswt.verify(token, secret, function (err, decoded) {

        if (decoded) {
            res.user = {
                _id: decoded.id,
                username: decoded.username
            }
        }

    });

    next();

};


module.exports = { isLogged };
