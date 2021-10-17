let jwt = require('jsonwebtoken');
let secret = 'mysecret';

exports.auth = function (req, res, next) {
    let token = req.cookies.jwt;

    if (token) {
        let decoded = jwt.verify(token, secret);
        req.user = decoded;
        res.locals.user = req.user;
    }

    next();
}
