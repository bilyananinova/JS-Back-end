let Accessory = require('../models/Accessory');

function getAll() {
    return Accessory.find().lean();
}

function createAcc(name, description, imageUrl) {
    let accessory = new Accessory({
        name,
        description,
        imageUrl
    });

    return accessory.save();
}

function getAllNotIn(id) {
    return Accessory.find().where('_id').nin(id).lean();
}

module.exports = {
    getAll,
    createAcc,
    getAllNotIn
}