let express = require('express');
let router = express.Router({ mergeParams: true });

let { register, login } = require('../services/authServices');
let { createToken } = require('../utils/jswToken');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', (req, res, next) => {
    let { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('user/register', { error: 'Passwords mismatch' });
    }

    if (username == '', password == '', repeatPassword = '') {
        res.render('user/register', { error: 'All fields are required' });
    }

    register(username, password)
        .then(user => {
            return createToken(user);
        })
        .then(token => {
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/');
        })
        .catch((err) => {
            res.render('user/register', { error: err.message });
        })
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (username == '', password == '') {
        res.render('user/login', { error: 'All fields are required' });
    }

    login(username, password)
        .then(user => {
            return createToken(user);
        })
        .then(token => {
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/');
        })
        .catch((err) => {
            res.render('user/login', { error: err.message });
        })
});

router.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

module.exports = router;