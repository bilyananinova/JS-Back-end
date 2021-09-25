let fs = require('fs');
let express = require('express');
let cats = require('../database/cats.json');

let router = express.Router();

router.get('/cats-edit/:id?', (req, res) => {
    let cat = cats.find(c => c.id == req.params.id);
    res.render('editCat', { cat });
});

router.post('/cats-edit/:id?', (req, res) => {
    let cat = cats.find(c => c.id == req.params.id);
    let edittedCat = req.body
    edittedCat.id = req.params.id;
    let result = JSON.stringify(cats).replace(JSON.stringify(cat), JSON.stringify(edittedCat));
    JSON.stringify(result, '', 2);
    fs.writeFileSync('./database/cats.json', result);
    res.redirect('/');
});


module.exports = router;