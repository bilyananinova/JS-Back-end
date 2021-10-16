let express = require('express');
let router = express.Router();

let { create } = require('../services/accessoryService.js');
let notifications = require('../middlewares/notifications');

router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
})

router.post('/create', (req, res, next) => {
    let { name, description, imageUrl } = req.body;

    if (name == '', description == '', imageUrl == '') {
        next(['All fields are required!']);
        return res.render('accessory/createAccessory', { name, description, imageUrl });
    }

    create(name, description, imageUrl)
        .then(acc => {
            res.redirect('/');
        })
        .catch(err => { 
            next(notifications(err));
            res.render('accessory/createAccessory', { name, description, imageUrl });
        });
});


module.exports = router;