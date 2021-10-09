let Cube = require('../models/Cube.js');

async function getAll() {
    return await Cube.find({}).lean();
}

async function getById(id) {
    return await Cube.findById(id).populate('accessories').lean();
}

async function create(name, description, imageUrl, difficulty) {
    let cube = await new Cube({ name, description, imageUrl, difficulty });
    return cube.save();
}

async function attach(cubeId, accId) {
    let cube = await Cube.findById(cubeId);
    cube.accessories.push(accId);
    return cube.save();
}

async function search(query) {
    let { search, from, to } = query;

    let cubes = await Cube.find().lean();
    
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
    search
}