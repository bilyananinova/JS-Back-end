let express = require('express');
let router = express.Router();

let { createCube } = require('../services/cubeServices.js');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    let { name, description, imageUrl, difficulty } = req.body;

    try {

        await createCube(name, description, imageUrl, difficulty);
        res.redirect('/');

    } catch (err) {
        return `${err}`;
    }
});

module.exports = router;