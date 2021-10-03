let Accessory = require('../models/Accessory.js');
let Cube = require('../models/Cube.js');

async function getAll() {
    return Cube.find().lean();
}

async function getById(id) {
    return Cube.findById({ _id: id }).lean();
}

async function createCube(name, description, imageUrl, difficulty) {

    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

    return cube.save();
}

async function attachAccessory(cubeId, accId) {
    let cube = await Cube.findById({ _id: cubeId });
    let accessory = await Accessory.findById({ _id: accId });

    cube.accessories.push(accessory);

    return cube.save();
}

module.exports = {
    getAll,
    getById,
    createCube,
    attachAccessory,
}