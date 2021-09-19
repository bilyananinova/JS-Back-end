let querystring = require('querystring');

let dbCats = require('../database/cats.json');

function search(req) {
    let search = querystring.parse(req.url, '?');
    let string = search.search;
    let cats = dbCats.cats.filter(c => c.name.toLowerCase() == string.toLowerCase() || c.breed.toLowerCase() == string.toLowerCase());

    return cats;
}

module.exports = search;