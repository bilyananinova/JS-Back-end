let Cube = require('../models/Cube');

function createCube(cubeData) {
    let cube = new Cube ({
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficulty: cubeData.difficulty,
    });

    return cube.save();
}

module.exports = {
    createCube,

}