let express = require('express');
let router = express.Router();

let catController = require('./handlers/catController.js');

router.get('/', catController);
router.get('/cats/add-breed', catController);
router.get('/cats/add-cat', catController);
router.get('/cats-edit/:id?', catController);
router.get('/cats-find-new-home/:id?', catController);

module.exports = router;