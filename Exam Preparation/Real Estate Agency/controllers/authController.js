let express = require('express');
let router = express.Router();

let { register, login, jsonWebToken } = require('../services/authService');
let { TOKEN } = require('../config/constants');

router.get('/register', (req, res) => {

    res.render('register', { title: 'Register page' });

});

router.post('/register', async (req, res) => {

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

        console.log(error);
    } 
});

router.get('/login', (req, res) => {

    res.render('login', { title: 'Login page' });

});

router.post('/login', async (req, res) => {

    let { username, password } = req.body;

    try {
        let user = await login(username, password);
        let token = jsonWebToken(user);

        res.cookie(TOKEN, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie(TOKEN);
    res.redirect('/');
});

module.exports = router;