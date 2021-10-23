let User = require('../models/User');

exports.myPage = async function (username) {
    let user = await User.findOne({ username }).populate('enrolledCourses');
    let courses = user.enrolledCourses.map(c => c.title)

    return courses
}