let cubes = require('../database/database.json');

function homeRender(req, res) {
    console.log(cubes);
    res.render('index', { cubes });
}

function aboutRender(req, res) {
    res.render('about');
}

function search(req, res) {
    let result = cubes;

    if (req.query.search) {
        result = result.filter(c => c.name.toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase()));
    }
    
    if (req.query.from) {
        result = result.filter(c => c.difficulty >= req.query.from);
    }

    if (req.query.to) {
        result = result.filter(c => c.difficulty <= req.query.to);
    }

    cubes = result;
    res.render('index', { cubes });
}

module.exports = {
    homeRender,
    aboutRender,
    search
};