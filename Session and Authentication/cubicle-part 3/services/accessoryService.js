let Accessory = require('../models/Accessory.js');

async function getAll() {
    return await Accessory.find({}).lean();
}

async function getAllWithout(id) {
    let acc = await Accessory.find({})
        .where('_id')
        .nin(id)
        .lean()
    return acc;
}

async function create(name, description, imageUrl) {
    let accessory = await new Accessory({ name, description, imageUrl });
    return accessory.save();
}


module.exports = {
    getAll,
    getAllWithout,
    create
}