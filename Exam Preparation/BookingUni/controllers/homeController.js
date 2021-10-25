let express = require('express');
let router = express.Router();

let { getAll } = require('../services/productServices');

router.get('/', async (req, res) => {

    try {
        let hotels = await getAll();

        if (!req.user) [
            hotels = hotels.sort((a, b) => b.freeRooms - a.freeRooms)
        ]

        res.render('home pages/home', { hotels });
    } catch (error) {
        throw new Error(error.message)
    }
});

module.exports = router;