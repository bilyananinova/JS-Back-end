let express = require('express');
let router = express.Router();

let { createCube, getById } = require('../services/cubeServices.js');
let cubeAccessoryController = require('./cubeAccessoryController.js');

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

router.get('/:id', async (req, res) => {

    let cube = await getById(req.params.id);
    res.render('details', { cube });
});

router.use('/:id/accessory', cubeAccessoryController)

module.exports = router;