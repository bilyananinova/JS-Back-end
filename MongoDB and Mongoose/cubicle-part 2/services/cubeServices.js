let Cube = require('../models/Cube.js');

function getAll() {
    return Cube.find().lean();
}

function getById(id) {
    return Cube.findById({ _id: id }).lean();
}

function createCube(name, description, imageUrl, difficulty) {

    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

    return cube.save();
}

module.exports = {
    getAll,
    getById,
    createCube,
}