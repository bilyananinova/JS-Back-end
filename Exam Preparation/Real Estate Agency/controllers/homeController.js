let express = require('express');
let router = express.Router();

let { getAll, search } = require('../services/houseServices');

router.get('/', async (req, res) => {
    try {
        let houses = await getAll();
        houses = houses.slice(-3);

        res.render('home', { title: 'Home page', houses });

    } catch (err) {
        console.log(err);
    }
});

router.get('/search', async (req, res) => {

    let houses = await search(req.query.search);

    res.render('search', { title: 'Search Page', houses });

});

module.exports = router;