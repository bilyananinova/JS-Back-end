let Course = require('../models/Course');

exports.getAll = function () {
    return Course.find({}).lean();
}

exports.getOne = function (id) {
    return Course.findById(id).lean();
}

exports.create = function (title, description, imageUrl, isPublic, creator) {
    return Course.create({ title, description, imageUrl, isPublic, creator });
}

exports.edit = function (id, title, description, imageUrl, isPublic) {

    return Course.findByIdAndUpdate(id,
        {title, description, imageUrl, isPublic },
        { runValidators: true }
    );
}

exports.deleteProduct = function (id) {
    return Course.findByIdAndDelete(id);
}

exports.enrolled = function (courseId, enrolledId) {
    return Course.findByIdAndUpdate(courseId, {
        $push: {usersEnrolled: enrolledId}
    })
}