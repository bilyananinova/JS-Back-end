let express = require('express');
let router = express.Router();

let { create } = require('../services/houseServices');

router.get('/create-offer', (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create-offer', async (req, res) => {
    let { homeName, type, year, city, homeImage, description, availablePieces } = req.body;
    let creator = req.user.id;

    try {
        await create(homeName, type, year, city, homeImage, description, availablePieces, creator);
        res.redirect('/house/housing-for-rent')
    } catch (err) {
        console.log(err);
    }
});



module.exports = router;