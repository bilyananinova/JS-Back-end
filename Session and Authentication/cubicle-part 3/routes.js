let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController.js');
let cubeController = require('./controllers/cubeController.js');
let accessoryController = require('./controllers/accessoryController.js');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;