let express = require('express');
let router = express.Router();

let homeController = require('./handlers/homeController.js');
let addBreedController = require('./handlers/addBreedController.js');
let addCatController = require('./handlers/addCatController.js');
let editCatController = require('./handlers/editCatController.js');

router.get('/', homeController);

router
    .get('/cats/add-breed', addBreedController)
    .post('/cats/add-breed', addBreedController);

router
    .get('/cats/add-cat', addCatController)
    .post('/cats/add-cat', addCatController);

router
    .get('/cats-edit/:id?', editCatController)
    .post('/cats-edit/:id?', editCatController);

router.get('/cats-find-new-home/:id?', (req, res) => {
    res.render('catShelter');
});

module.exports = router