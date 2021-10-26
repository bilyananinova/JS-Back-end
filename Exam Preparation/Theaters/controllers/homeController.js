let express = require('express');
let router = express.Router();

let { getAllByDate, getTop } = require('../services/productServices');

router.get('/', async (req, res) => {

    try {

        if (req.user) {
            let theaters = await getAllByDate();

            res.render('user-home', { theaters });
        } else {
            let theaters = await getTop();

            res.render('guest-home', { theaters });
        }


    } catch (error) {
        throw new Error(error.message)
    }
});

module.exports = router;