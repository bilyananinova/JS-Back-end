let Cube = require('../models/Cube.js');
let Accessory = require('../models/Accessory.js');

async function getAll() {
    return await Cube.find({}).lean();
}

async function getById(id) {
    return await Cube.findById(id).populate('accessories').lean();
}

async function outlet() {
    let a = Accessory.find({}).lean();
    console.log(a);
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

module.exports = {
    getAll,
    getById,
    outlet,
    create,
    attach
}