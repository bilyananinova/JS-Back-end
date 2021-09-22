let express = require('express');
let cats = require('../database/cats.json');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { cats });
});

router.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

router.post('/cats/add-breed', (req, res) => {
    res.writeHead(200);
    res.send(req.body)
});

router.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
});

router.post('/cats/add-cat', (req, res) => {
    console.log(req.body);
});

router.get('/cats-edit/:id?', (req, res) => {
    res.render('editCat');
});

router.get('/cats-find-new-home/:id?', (req, res) => {
    res.render('catShelter');
});

module.exports = router;