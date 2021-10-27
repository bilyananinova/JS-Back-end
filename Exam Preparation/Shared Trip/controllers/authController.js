let express = require('express');
let router = express.Router();
let validator = require('validator');

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { isAuth, isGuest } = require('../middlewares/auth');

router.get('/register', isGuest, (req, res) => {

    res.render('register', { title: 'Register Page' });

});

router.post('/register', isGuest, async (req, res) => {

    let { email, password, rePassword, gender } = req.body;

    try {

        if (!validator.isEmail(email)) {
            throw new Error('Thats not valid email!')
        }

        let gender = Object.keys(req.body)[3]

        if (password != rePassword) {
            throw new Error('Passwords missmatch!');
        }

        let user = await register(email, password, rePassword, gender);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('register', { title: 'Register Page', email, password, rePassword, gender });
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('login', { title: 'Login Page' });

});

router.post('/login', isGuest, async (req, res) => {

    let { email, password } = req.body;

    try {

        if (email == '' || password == '') {
            throw new Error('All fields are required');
        }

        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid');
        }


        let user = await login(email, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('login', { title: 'Login Page', email, password });
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;