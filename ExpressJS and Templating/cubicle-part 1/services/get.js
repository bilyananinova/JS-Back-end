let cubes = require('../database/database.json');

function details(id) {
    let cube = db.find(c => c.id == id);
    return cube;
}

function search(req) {
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

    return result;
}

module.exports = { details, search };