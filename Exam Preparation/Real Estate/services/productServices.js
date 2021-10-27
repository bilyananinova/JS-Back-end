let Housing = require('../models/Housing');

exports.getTop = function () {
    return Housing.find({}).sort('-createdAt').limit(3).lean();
}

exports.getAll = function () {
    return Housing.find({}).lean();
}

exports.getOne = function (id) {
    return Housing.findById(id).populate('rented').lean();
}

exports.create = function (name, type, year, city, homeImage, description, availablePieces, owner) {
    return Housing.create({ name, type, year, city, homeImage, description, availablePieces, owner });
}

exports.edit = function (id, homeName, type, year, city, homeImage, description, availablePieces) {

    return Housing.findByIdAndUpdate(id,
        { homeName, type, year, city, homeImage, description, availablePieces },
        { runValidators: true }
    ).lean();
}

exports.deleteHouse = function (id) {
    return Housing.findByIdAndDelete(id);
}

exports.rent = function (houseId, userId) {
    return Housing.findByIdAndUpdate(houseId, {
        $push: { rented: userId },
        $inc: { availablePieces: -1 }
    });
}

exports.search = function (search) {
    return Housing.find({
        'type': { $regex: search || '', $options: 'i' }
    }).lean();
}