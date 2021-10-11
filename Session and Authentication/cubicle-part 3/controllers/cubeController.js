let express = require('express');
let router = express.Router();

let { create, getById } = require('../services/cubeServices.js');
let cubeAccController = require('./cubeAccController.js');
let { auth } = require('../middlewares/auth');

router.get('/create', auth, (req, res) => {
    res.render('cube/create');
});

router.post('/create', (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;
    let creatorId = res.user._id;

    create(name, description, imageUrl, difficulty, creatorId)
        .then(cube => {
            res.redirect('/');
        });
});

router.get('/details/:id', (req, res) => {
    getById(req.params.id)
        .then(cube => {
            res.render('cube/details', { ...cube });
        });
});

router.use('/:id/accessory', cubeAccController);

module.exports = router;