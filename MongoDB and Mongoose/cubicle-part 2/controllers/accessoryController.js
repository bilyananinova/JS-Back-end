let express = require('express');
let router = express.Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

module.exports = router;