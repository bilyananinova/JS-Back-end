let express = require('express');
let router = express.Router();

let { getAll } = require('../services/cubeServices.js');

router.get('/', (req, res) => {
    getAll()
        .then(cubes => {
            res.render('index', { cubes });
        });
});

router.get('/about', (req, res) => {
    res.render('about');
});

// TODO: search

module.exports = router;
