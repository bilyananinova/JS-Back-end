let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

router.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
});

router.get('/cats-edit/:id?', (req, res) => {
    res.render('editCat');
});

router.get('/cats-find-new-home/{{id}}', (req, res) => {
    res.render('catShelter');
});
module.exports = router;