let express = require('express');
let router = express.Router();
let validator = require('validator');

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { isAuth, isGuest } = require('../middlewares/auth');

router.get('/register', isGuest, (req, res) => {

    res.render('user pages/register');

});

router.post('/register', isGuest, async (req, res) => {

    let { email, username, password, rePassword } = req.body;

    try {

        if (!validator.isEmail(email)) {
            throw new Error('The email should be a valid email and should consist english letters and digits')
        }

        if (password != rePassword) {
            throw new Error('Passwords missmatch!');
        }

        let user = await register(email, username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('user pages/register', { email, username, password, rePassword });
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('user pages/login');

});

router.post('/login', isGuest, async (req, res) => {

    let { username, password } = req.body;

    if (username == '' || password == '') {
        throw new Error('All fields are required');
    }

    try {

        let user = await login(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('user pages/login', { username, password });
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;