let House = require('../models/House');

exports.isOwner = function (req, res, next) {
    let house = House.findById(req.params.id);

    if (house.creator == req.user.id) {
        next()
    } else {
        res.render('404', { title: 'Not Found Page' });
    }
}