let fs = require('fs');
let express = require('express');
let breeds = require('../database/breeds.json');

let router = express.Router();

router.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

router.post('/cats/add-breed', (req, res) => {
    breeds.push(req.body.breed);
    let result = JSON.stringify(breeds, '', 2)
    fs.writeFileSync('./database/breeds.json', result);
    res.redirect('/');
});

module.exports = router;