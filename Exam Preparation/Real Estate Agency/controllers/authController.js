let express = require('express');
let router = express.Router();

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');
let { errorHandller } = require('../utils/errorHandller');

router.get('/register', (req, res) => {

    res.render('register', { title: 'Register page' });

});

router.post('/register', async (req, res, next) => {

    let { name, username, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.errors = ['Passwords missmatch!'];
        return res.render('register', { title: 'Register page' });
    }

    try {
        let user = await register(name, username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('register', { title: 'Register Page', errors: errorHandller(error) });
    }
});

router.get('/login',  (req, res) => {

    res.render('login', { title: 'Login page' });

});

router.post('/login', async (req, res) => {

    let { username, password } = req.body;

    try {
        let user = await login(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('login', { title: 'Login page', errors: [error.message] });
    }
});

router.get('/logout',  (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;