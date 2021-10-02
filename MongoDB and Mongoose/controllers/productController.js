let express = require('express');

let router = express.Router();

let { createCube } = require('../services/cubeServices.js');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    await createCube(req.body);
    res.redirect('/');
});

module.exports = router;