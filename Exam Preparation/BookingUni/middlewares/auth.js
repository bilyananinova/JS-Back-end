let jwt = require('jsonwebtoken');
let { SECRET, TOKEN } = require('../config/constants');

exports.auth = function (req, res, next) {
    let token = req.cookies[TOKEN];

    if (!token) {
        return next();
    }

    if (token) {

        let decoded = jwt.verify(token, SECRET);

        req.user = decoded;
        res.locals.user = decoded;

        next();
    }

}

exports.isAuth = function (req, res, next) {
    if (req.user) {
        next();
    } 
}

exports.isGuest = function (req, res, next) {
    if (!req.user) {
        next();
    } 
}