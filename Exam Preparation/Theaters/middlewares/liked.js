let Play = require('../models/Play');

exports.isLike = async function (req, res, next) {
    let theater = await Play.findById(req.params.id);

    let isLike = theater.usersLiked.some(r => r._id == req.user?.id);

    if(req.user && !isLike) {
        next();
    }
};