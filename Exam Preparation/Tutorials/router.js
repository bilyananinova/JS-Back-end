let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController');
let authController = require('./controllers/authController');
let productController = require('./controllers/productController');
let myPageController = require('./controllers/myPageController');

router.use('/', homeController);
router.use('/user', authController);
router.use('/product', productController);
router.use('/profile', myPageController);

module.exports = router;