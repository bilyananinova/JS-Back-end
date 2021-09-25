let express = require('express');
let cats = require('../database/cats.json');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { cats });
});

module.exports = router;