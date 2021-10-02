let express = require('express');
let router = express.Router();

let { getAll } = require('../services/cubeServices.js');

router.get('/', async (req, res) => {
    let cubes = await getAll();
    res.render('index', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;