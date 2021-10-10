let Accessory = require('../models/Accessory.js');

function getAll() {
    Accessory.find({})
        .then(accessories => {
            return accessories;
        })
}

async function getAllWithout(id) {
    let acc = await Accessory.find({})
        .where('_id')
        .nin(id)
        .lean()
    return acc;
}

function create(name, description, imageUrl) {
    let accessory = new Accessory({ name, description, imageUrl });
    return accessory.save();
}


module.exports = {
    getAll,
    getAllWithout,
    create
}