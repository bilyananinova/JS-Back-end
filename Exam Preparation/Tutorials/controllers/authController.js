let express = require('express');
let router = express.Router();

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { isAuth, isGuest } = require('../middlewares/auth');

router.get('/register', isGuest, (req, res) => {

    res.render('register', { title: 'Register page' });

});

router.post('/register', isGuest, async (req, res, next) => {

    let { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.errors = ['Passwords missmatch!'];
        return res.render('register', { title: 'Register page' });
    }

    try {
        let user = await register(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        return res.render('register', { title: 'Register page' });
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('login', { title: 'Login page' });

});

router.post('/login', isGuest, async (req, res) => {

    let { username, password } = req.body;

    try {
        let user = await login(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        return res.render('login', { title: 'Login page', errors: [error.message] });
    }
});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;