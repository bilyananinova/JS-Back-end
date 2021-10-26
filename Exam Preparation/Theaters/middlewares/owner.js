let Play = require('../models/Play');

exports.isOwner = async function (req, res, next) {
    let theater = await Play.findById(req.params.id);

    if (req.user && theater.creator == req.user.id) {
        next()
    } 
}

exports.isNotOwner = async function (req, res, next) {
    let theater = await Play.findById({ _id: req.params.id }).lean();

    if (req.user && theater.creator != req.user.id) {
        next()
    } 
}