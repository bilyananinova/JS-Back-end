let express = require('express');
let router = express.Router();

let { create } = require('../services/accessoryService.js');

router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
})

router.post('/create', (req, res) => {
    let { name, description, imageUrl } = req.body;

    create(name, description, imageUrl)
    .then(result => {
        res.redirect('/');
    });
});


module.exports = router;