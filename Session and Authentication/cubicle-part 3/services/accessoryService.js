let Accessory = require('../models/Accessory.js');

async function getAll() {
    return await Accessory.find({}).lean();
}

async function create(name, description, imageUrl) {
    let accessory = await new Accessory({ name, description, imageUrl });
    return accessory.save();
}


module.exports = {
    getAll,
    create
}