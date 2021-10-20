let House = require('../models/House');

exports.getAll = function () {
    return House.find({}).lean();
}

exports.getOne = function (id) {
    return House.findById(id).populate('rented').lean();
}

exports.create = function (homeName, type, year, city, homeImage, description, availablePieces, creator) {
    return House.create({ homeName, type, year, city, homeImage, description, availablePieces, creator });
}

exports.edit = function (id, homeName, type, year, city, homeImage, description, availablePieces) {

    return House.findByIdAndUpdate(id,
        { homeName, type, year, city, homeImage, description, availablePieces },
        { runValidators: true }
    );
}

exports.deleteHome = function (id) {
    return House.findByIdAndDelete(id);
}

exports.rent = function (houseId, id) {

    let house = House.findById(houseId);

    house.rented.push(id);
    house.availablePieces--;

    return house.save();
}

exports.search = function (text) {
    return House.find({
        type: { $regex: text || '', $options: 'i' }
    }).lean();
}