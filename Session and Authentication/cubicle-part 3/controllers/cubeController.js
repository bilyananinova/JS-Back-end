let express = require('express');
let router = express.Router();

let { create, getById, edit, deleteCube } = require('../services/cubeServices.js');
let cubeAccController = require('./cubeAccController.js');

router.get('/create', (req, res) => {
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
            let creator = res.user._id == cube.creatorId
            res.render('cube/details', { ...cube, creator });
        });
});

router.get('/:id/edit', (req, res) => {
    getById(req.params.id)
        .then(cube => {
            res.render('cube/edit', { ...cube });
        });
});

router.post('/:id/edit', (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    edit(req.params.id, name, description, imageUrl, difficulty);
    res.redirect(`/cube/details/${req.params.id}`)

});

router.get('/:id/delete', (req, res) => {
    getById(req.params.id)
        .then(cube => {
            res.render('cube/delete', { ...cube })
        });
});

router.post('/:id/delete', (req, res) => {
    deleteCube(req.params.id)
        .then(() => {
            res.redirect('/');
        })
});

router.use('/:id/accessory', cubeAccController);

module.exports = router;