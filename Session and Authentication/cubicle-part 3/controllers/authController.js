let express = require('express');
let router = express.Router({ mergeParams: true });
let jwt = require('jsonwebtoken');

let { register, login } = require('../services/authServices');
let secret = 'mysupersecretsecret';

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        return;
    }

    await register(username, password)

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    await login(username, password);

    res.redirect('/');
});

module.exports = router;