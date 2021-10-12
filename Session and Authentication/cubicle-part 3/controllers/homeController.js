let express = require('express');
let router = express.Router();

let { getAll, search } = require('../services/cubeServices.js');

router.get('/', (req, res) => {
    getAll()
        .then(cubes => {
            res.render('index', { cubes });
        });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', (req, res) => {
    search(req.query)
        .then(cubes => {
            console.log(cubes);
            res.render('index', { cubes });
        });
});

module.exports = router;
