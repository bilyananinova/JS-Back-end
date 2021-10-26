let Play = require('../models/Play');
let User = require('../models/User');


exports.getTop = async function () {
    return await Play.find({ "isPublic": true }).sort('-usersLiked').limit(3).lean();
}

exports.getAllByLikes = async function () {
    return await Play.find({ "isPublic": true }).sort('-usersLiked').sort('-createdAt').lean();
}

exports.getAllByDate = async function () {
    return await Play.find({ "isPublic": true }).sort('-createdAt').lean();
}

exports.getOne = async function (id) {
    return await Play.findById(id).lean();
}

exports.create = async function (title, description, imgUrl, isPublic, creator) {
    return await Play.create({ title, description, imgUrl, isPublic, creator });
}

exports.edit = async function (id, title, description, imgUrl, isPublic) {

    return await Play.findByIdAndUpdate(id,
        { title, description, imgUrl, isPublic },
        { runValidators: true }
    ).lean();
}

exports.deleteHouse = async function (id) {
    return await Play.findByIdAndDelete(id);
}

exports.like = async function (playId, userId) {
    let play = await Play.findByIdAndUpdate(playId, {
        $push: { usersLiked: userId }
    });

    let user = await User.findByIdAndUpdate(userId, {
        $push: { likedPlays: playId }
    });

    return { play, user };

}