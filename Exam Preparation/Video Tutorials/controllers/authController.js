let express = require('express');
let router = express.Router();

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { isAuth, isGuest } = require('../middlewares/auth');

router.get('/register', isGuest, (req, res) => {

    res.render('user pages/register');

});

router.post('/register', isGuest, async (req, res, next) => {

    let { username, password, rePassword } = req.body;

    if (password != rePassword) {
        res.locals.errors = ['Passwords missmatch!'];
        return res.render('user pages/register');
    }

    try {
        let user = await register(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        return res.render('user pages/register');
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('user pages/login');

});

router.post('/login', isGuest, async (req, res) => {

    let { username, password } = req.body;

    try {
        let user = await login(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        return res.render('user pages/login', { errors: [error.message], username, password });
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;