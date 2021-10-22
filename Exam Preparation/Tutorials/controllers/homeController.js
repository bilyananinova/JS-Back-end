let express = require('express');
let router = express.Router();

let { getAll } = require('../services/productServices');

router.get('/', async (req, res) => {
    let courses = await getAll();
    res.render('home', { title: 'Home Page', courses })
});


module.exports = router;