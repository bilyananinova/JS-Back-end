let express = require('express');
let router = express.Router();

let homeController = require('./controllers/homeController');
let authController = require('./controllers/authController');
let houseController = require('./controllers/houseController');

router.use('/', homeController);
router.use('/user', authController);
router.use('/house', houseController);

module.exports = router;