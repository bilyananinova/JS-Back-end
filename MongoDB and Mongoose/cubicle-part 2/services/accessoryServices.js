let Accessory = require('../models/Accessory');

async function createAcc(name, description, imageUrl) {
    let accessory = new Accessory({
        name,
        description,
        imageUrl
    });

    return accessory.save();
}

module.exports = {
    createAcc,
}