let express = require('express');
let router = express.Router();

let { create, getById } = require('../services/cubeServices.js');
let cubeAccController = require('./cubeAccController.js');

router.get('/create', (req, res) => {
    res.render('cube/create');
});

router.post('/create', (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    create(name, description, imageUrl, difficulty)
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