let express = require('express');
let router = express.Router();

let { getAll, search } = require('../services/cubeServices.js');

router.get('/', async (req, res) => {

    let cubes = await getAll();
    res.render('index', { cubes });
});

router.get('/about', (req, res) => {

    res.render('about');
});

router.get('/search', async (req, res) => {
    let cubes = await search(req.query.search, req.query.from, req.query.to)
    res.render('index', { cubes });
});

module.exports = router;