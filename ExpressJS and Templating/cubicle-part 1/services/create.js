let Cube = require('../models/Cube');
let db = require('../database/database.json');

function create(name, description, imageUrl, difficulty) {
    let cube = new Cube(name, description, imageUrl, difficulty);
    db.push(cube);
}

module.exports = create;