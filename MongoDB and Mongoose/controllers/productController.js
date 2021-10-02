let express = require('express');

let router = express.Router();

router.get('/create', (req, res) => {
    res.render('create');
});


module.exports = router;