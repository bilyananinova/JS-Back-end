let express = require('express');

let router = express.Router();

// Controllers
let homeController = require('./controllers/homeController.js');
let productController = require('./controllers/productController.js');
let accessoryController = require('./controllers/accessoryController.js');

router.use('/', homeController);
router.use('/cube', productController);
router.use('/accessory', accessoryController);
router.use('/about', homeController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;