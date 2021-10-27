let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController');
let authController = require('./controllers/authController');
let productController = require('./controllers/productController');

router.use('/', homeController);
router.use('/user', authController);
router.use('/housing', productController);
router.get('* ', (req, res) => {
    res.render('404', {page: 'Not Found Page'});
});
module.exports = router;