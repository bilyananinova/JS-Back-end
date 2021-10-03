let express = require('express');
let router = express.Router();

let { createAcc } = require('../services/accessoryServices.js');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', async (req, res) => {

    let { name, description, imageUrl } = req.body;

    try {

        await createAcc(name, description, imageUrl);
        res.redirect('/');

    } catch (err) {
        return `${err}`;
    }
});

module.exports = router;