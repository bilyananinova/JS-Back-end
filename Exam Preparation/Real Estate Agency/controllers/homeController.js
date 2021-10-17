let express = require('express');
let router = express.Router();

let { getAll } = require('../services/houseServices');

router.get('/', async (req, res) => {
    try {
        let houses = await getAll();
        houses = houses.slice(-3);

        res.render('home', { title: 'Home page', houses });

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;