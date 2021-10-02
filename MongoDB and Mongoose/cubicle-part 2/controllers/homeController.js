let express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;