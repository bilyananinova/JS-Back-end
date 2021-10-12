let Cube = require('../models/Cube.js');

function getAll() {
    return Cube.find({}).lean()
}

function getById(id) {
    return Cube.findById(id).populate('accessories').lean();
}

function create(name, description, imageUrl, difficulty, creatorId) {
    let cube = new Cube({ name, description, imageUrl, difficulty, creatorId });
    return cube.save();
}

function attach(cubeId, accId) {
    let cube = Cube.findById(cubeId);
    cube.accessories.push(accId);
    return cube.save();
}

function edit(id, name, description, imageUrl, difficulty) {
    Cube.findByIdAndUpdate(id, { name, description, imageUrl, difficulty }, { runValidators: true })
        .then(cube => {
            return cube;
        });
}

function deleteCube(id) {
    return Cube.findByIdAndDelete(id);
}

function search(query) {
    let { search, from, to } = query;

    let cubes = Cube.find().lean();

    if (search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        cubes = cubes.filter(c => c.difficulty >= from);
    }

    if (to) {
        cubes = cubes.filter(c => c.difficulty <= to);
    }

    return cubes;
}

module.exports = {
    getAll,
    getById,
    create,
    attach,
    edit,
    deleteCube,
    search
}