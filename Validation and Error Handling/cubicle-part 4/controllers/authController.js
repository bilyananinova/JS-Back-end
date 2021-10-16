let express = require('express');
let router = express.Router({ mergeParams: true });

let { register, login } = require('../services/authServices');
let { createToken } = require('../utils/jswToken');
let notifications = require('../middlewares/notifications');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', (req, res, next) => {
    let { username, password, repeatPassword } = req.body;

    if(password !== repeatPassword) {
        next(['Passwords missmatch'])
        return res.render('user/register', {username, password});
    }

    register(username, password)
        .then(user => {
            return createToken(user);
        })
        .then(token => {
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(err => {
            next(notifications(err));
            res.render('user/register', {username, password});
        })
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', (req, res, next) => {
    let { username, password } = req.body;

    login(username, password)
        .then(user => {
            return createToken(user);
        })
        .then(token => {
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(err => {
            next([err.message]);
            res.render('user/login');
        })
});

router.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

module.exports = router;