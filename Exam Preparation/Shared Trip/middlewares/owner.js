let Trip = require('../models/Trip');

exports.isOwner = async function (req, res, next) {
    let trip = await Trip.findById(req.params.id);

    if (req.user && trip.creator == req.user.id) {
        next()
    } else {
        res.redirect('/');
    }
}

exports.isNotOwner = async function (req, res, next) {
    let trip = await Trip.findById({ _id: req.params.id }).lean();

    if (req.user && trip.creator != req.user.id) {
        next()
    }
}