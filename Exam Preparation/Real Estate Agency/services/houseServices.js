let House = require('../models/House');

exports.getAll = function () {
    return House.find({}).lean();
}

exports.create = function (homeName, type, year, city, homeImage, description, availablePieces, creator) {
    return House.create({ homeName, type, year, city, homeImage, description, availablePieces, creator });
}