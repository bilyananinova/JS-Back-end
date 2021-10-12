let express = require('express');
let router = express.Router({ mergeParams: true });

let { register, login } = require('../services/authServices');
let { createToken } = require('../utils/jswToken');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        return;
    }

    register(username, password)
        .then(user => {
            return createToken(user);
        })
        .then(token => {
            res.cookie('jwt', token);
            res.redirect('/');
        })
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    login(username, password)
        .then(user => {
            return createToken(user)
        })
        .then(token => res.cookie('jwt', token, { httpOnly: true }))
        .then(() => res.redirect('/'));

});

router.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

module.exports = router;