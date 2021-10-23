let Course = require('../models/Course');

exports.isOwner = async function (req, res, next) {
    let course = await Course.findById(req.params.id);

    if (course.creator == req.user.id) {
        next()
    }
}

exports.isNotOwner = async function (req, res, next) {
    let course = awaitCourse.findById(req.params.id);

    if (course.creator !== req.user.id) {
        next()
    }
}

exports.isEnrolled = async function (req, res, next) {
    let course = await Course.findById(req.params.id).lean();

    if (req.user && !course.usersEnrolled.some(x => x._id == req.user.id)) {
        next()
    }
}