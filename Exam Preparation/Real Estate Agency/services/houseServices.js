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

exports.deleteHome = function (id) {
    return House.findByIdAndDelete(id);
}

exports.rent = async function (houseId, id) {
    let house = await House.findById(houseId);
    house.rented.push(id);
    house.availablePieces--;
    return house.save();
}