let cubes = require('../database/database.json');
let { search } = require('../services/get');

function homeRender(req, res) {
    res.render('index', { cubes });
}

function aboutRender(req, res) {
    res.render('about');
}

function searchController(req, res) {
    cubes = search(req);
    res.render('index', { cubes });
}

module.exports = {
    homeRender,
    aboutRender,
    searchController
};