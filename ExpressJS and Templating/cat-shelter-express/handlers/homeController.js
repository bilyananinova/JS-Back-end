let express = require('express');
let cats = require('../database/cats.json');
let breeds = require('../database/breeds.json');

let router = express.Router();
let result = [];

router.get('/', (req, res) => {
    res.render('index', { cats });
});

router.get('/search', (req, res) => {

    result = cats.filter(c => c.breed.toLocaleLowerCase() == req.query.search.toLocaleLowerCase()
        || c.name.toLocaleLowerCase() == req.query.search.toLocaleLowerCase());

    res.render('index', { result });
});

module.exports = router;