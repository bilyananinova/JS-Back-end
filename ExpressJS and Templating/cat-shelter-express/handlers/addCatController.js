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
    let { name, description, image, breed } = req.body;
    let cat = new Cat(name, description, image, breed);
    cats.push(cat);
    cats = JSON.stringify(cats, '', 2)
    fs.writeFileSync('./database/cats.json', cats);
    res.redirect('/');
});

module.exports = router;