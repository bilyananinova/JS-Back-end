let express = require('express');
let router = express.Router();

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { isAuth, isGuest } = require('../middlewares/auth');

router.get('/register', isGuest, (req, res) => {

    res.render('register');

});

router.post('/register', isGuest, async (req, res) => {

    let { username, password, rePassword } = req.body;

    try {

        if (password != rePassword) {
            throw new Error('Passwords missmatch!');
        }

        let user = await register(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('register', { username, password, rePassword });
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('login');

});

router.post('/login', isGuest, async (req, res) => {

    let { username, password } = req.body;

    if (username == '' || password == '') {
        res.locals.errors = ['All fields are required'];
        return res.render('login');
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

        res.render('login', { username, password });
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;