let express = require('express');
let router = express.Router();

let { getTop, search } = require('../services/productServices');

router.get('/', async (req, res) => {

    try {
        let housing = await getTop();

        res.render('home', { page: 'Home Page', housing });
    } catch (error) {
        throw new Error(error.message)
    }
});

router.get('/search', async (req, res) => {

    try {

        let housing = await search(req.query.search)

        res.render('search', { page: 'Search Page', housing });
    } catch (error) {
        throw new Error(error.message)
    }
});

module.exports = router;