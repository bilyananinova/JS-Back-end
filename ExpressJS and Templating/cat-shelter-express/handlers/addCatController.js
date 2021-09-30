let fs = require('fs');
let express = require('express');
let cats = require('../database/cats.json');
let breeds = require('../database/breeds.json');
let Cat = require('../models/Cat.js');

let router = express.Router();

router.get('/cats/add-cat', (req, res) => {
    res.render('addCat', { breeds });
});

router.post('/cats/add-cat', (req, res) => {

});

module.exports = router;