let fs = require('fs');
let express = require('express');
let cats = require('../database/cats.json');

let router = express.Router();

router.get('/cats-find-new-home/:id?', (req, res) => {
    let cat = cats.find(c => c.id == req.params.id);
    res.render('catShelter', { cat });
});

router.post('/cats-find-new-home/:id?', (req, res) => {
    cats = cats.filter(c => c.id != req.params.id);
    cats = JSON.stringify(cats, '', 2)
    fs.writeFileSync('./database/cats.json', cats);
    res.redirect('/');
});

module.exports = router;