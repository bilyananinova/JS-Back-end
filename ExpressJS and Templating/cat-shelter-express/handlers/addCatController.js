let fs = require('fs');
let express = require('express');
let multer = require('multer');
let cats = require('../database/cats.json');
let breeds = require('../database/breeds.json');
let Cat = require('../models/Cat.js');

let router = express.Router();
let upload = multer({ dest: "public/images/" });

router.get('/cats/add-cat', (req, res) => {
    res.render('addCat', { breeds });
});

router.post('/cats/add-cat', upload.single('image'), (req, res) => {
    let image = req.file.originalname;
    let { name, description, breed } = req.body;
    let cat = new Cat(name, description, image, breed);
    cats.push(cat);
    cats = JSON.stringify(cats, '', 2)
    fs.writeFileSync('./database/cats.json', cats);
    res.redirect('/');
});

module.exports = router;