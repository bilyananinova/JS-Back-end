let Accessory = require('../models/Accessory.js');

function getAll() {
    Accessory.find({})
        .then(accessories => {
            return accessories;
        })
}

function getAllWithout(id) {
    let acc = Accessory.find({})
        .where('_id')
        .nin(id)
        .lean()
    return acc;
}

function create(name, description, imageUrl) {
    return Accessory.create({ name, description, imageUrl });
}


module.exports = {
    getAll,
    getAllWithout,
    create
}