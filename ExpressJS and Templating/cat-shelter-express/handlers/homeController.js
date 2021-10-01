let express = require('express');
let cats = require('../database/cats.json');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { cats });
});

router.get('/search', (req, res) => {
    let result = cats.slice();
    result = cats.filter(c => c.breed.toLocaleLowerCase() == req.query.search.toLocaleLowerCase()
    || c.name.toLocaleLowerCase() == req.query.search.toLocaleLowerCase());

    cats = result.slice();
    res.render('index', { cats }); 
});

module.exports = router;