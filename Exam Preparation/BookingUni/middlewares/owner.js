let Hotel = require('../models/Hotel');

exports.isOwner = async function (req, res, next) {
    let housing = await Hotel.findById(req.params.id);

    if (req.user && housing.owner == req.user.id) {
        next()
    } else {
        res.render('404', {page: 'Not Found Page'});
    }
}

exports.isNotOwner = async function (req, res, next) {
    let housing = await Hotel.findById({ _id: req.params.id }).lean();

    if (req.user && housing.owner != req.user.id) {
        next()
    } else {
        res.render('404', {page: 'Not Found Page'});
    }
}