let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController');
let authController = require('./controllers/authController');
let houseController = require('./controllers/houseController');

router.use('/', homeController);
router.use('/user', authController);
router.use('/houses', houseController);
router.get('*', (req, res) => {
    res.render('404', { title: 'Not Found Page' });
})

module.exports = router;