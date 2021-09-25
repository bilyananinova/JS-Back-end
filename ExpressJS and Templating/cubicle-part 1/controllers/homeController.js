let cubes = require('../database/database.json');

function homeRender(req, res) {
    res.render('index', { cubes });
}

function aboutRender(req, res) {
    res.render('about');
}

function search(req, res) {

}

module.exports = {
    homeRender,
    aboutRender,
    search
};