let create = require("../services/create");
let { details } = require("../services/get");

function createRender(req, res) {
    res.render('create');
}

function creteCube(req, res) {
    let { name, description, imageUrl, difficulty } = req.body;
    create(name, description, imageUrl, difficulty);
    res.redirect('/');
}

function detailsRender(req, res) {
    let cube = details(req.params.id);
    res.render('details', { cube });
}

module.exports = {
    createRender,
    detailsRender,
    creteCube
}