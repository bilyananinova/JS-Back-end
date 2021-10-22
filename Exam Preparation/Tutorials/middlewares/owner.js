let Course = require('../models/Course');

exports.isOwner = async function (req, res, next) {
    let course = await Course.findById(req.params.id);

    if (course.creator == req.user.id) {
        next()
    }
}

exports.isNotOwner = function (req, res, next) {
    let course = Course.findById(req.params.id);

    if (course.creator != req.user.id) {
        next()
    }
}