let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController');
let authController = require('./controllers/authController');
let productController = require('./controllers/productController');
let profileController = require('./controllers/profileController');

router.use('/', homeController);
router.use('/user', authController);
router.use('/trips', productController);
router.use('/profile', profileController);
router.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
});

module.exports = router;