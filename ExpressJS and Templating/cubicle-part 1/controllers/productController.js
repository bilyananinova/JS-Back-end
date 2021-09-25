let Cube = require('../models/Cube');
let db = require('../database/database.json');

function createRender(req, res) {
    res.render('create');
}

function creteCube(req, res) {
    let { name, description, imageUrl, difficulty } = req.body;
    let cube = new Cube(name, description, imageUrl, difficulty);
    db.push(cube);
    res.redirect('/');
}

function detailsRender(req, res) {
    let id = req.params.id;
    let cube = db.find(c => c.id == id);
    console.log(cube);
    res.render('details', { cube });
}

module.exports = {
    createRender,
    detailsRender,
    creteCube
}