let Cube = require('../models/Cube.js');

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
    createCube,
}