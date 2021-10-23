let Course = require('../models/Course');

exports.getAll = function () {
    return Course.find({}).lean();
}

exports.getAllAsc = function () {
    return Course.find({}).sort('createdAt').lean();
}

exports.getOne = function (id) {
    return Course.findById(id).lean();
}

exports.create = function (title, description, imageUrl, duration, creator) {
    return Course.create({ title, description, imageUrl, duration, creator });
}

exports.edit = function (id, title, description, imageUrl, duration) {

    return Course.findByIdAndUpdate(id,
        { title, description, imageUrl, duration },
        { runValidators: true }
    ).lean();
}

exports.deleteProduct = function (id) {
    return Course.findByIdAndDelete(id);
}

exports.enroll = function (courseId, userId) {
    return Course.findByIdAndUpdate(courseId, {
        $push: { usersEnrolled: userId }
    });
}

exports.search = async function (search) {
    return Course.find({
        'title': { $regex: search, $options: 'i' }
    }).lean();
}