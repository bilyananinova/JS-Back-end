let express = require('express');
let router = express.Router({ mergeParams: true });

let { register, login } = require('../services/authServices');
let { createToken } = require('../utils/jswToken');


router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        return;
    }

    let user = await register(username, password);
    let token = await createToken(user);
    res.cookie('jwt', token);
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});


router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    let user = await login(username, password);
    let token = await createToken(user);
    res.cookie('jwt', token);
    res.redirect('/');
});

module.exports = router;