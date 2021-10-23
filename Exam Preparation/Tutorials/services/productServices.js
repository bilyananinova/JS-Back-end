let Course = require('../models/Course');
let User = require('../models/User');

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
        { title, description, imageUrl, isPublic },
        { runValidators: true }
    );
}

exports.deleteProduct = function (id) {
    return Course.findByIdAndDelete(id);
}

exports.enrolled = async function (courseId, userId) {
    let course = await Course.findByIdAndUpdate(courseId, {
        $push: { usersEnrolled: userId }
    });

    let user = await User.findByIdAndUpdate(userId, {
        $push: { enrolledCourses: courseId }
    });

    return { course, user };
}