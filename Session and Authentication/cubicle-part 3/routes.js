let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController.js');
let cubeController = require('./controllers/cubeController.js');
let accessoryController = require('./controllers/accessoryController.js');
let authController = require('./controllers/authController.js');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/user', authController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;