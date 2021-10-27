let express = require('express');
let router = express.Router();

// let { getTop, search } = require('../services/productServices');

router.get('/', async (req, res) => {

    try {
        // let housing = await getTop();

        res.render('home', { title: 'Home Page' });
    } catch (error) {
        throw new Error(error.message)
    }
});

module.exports = router;