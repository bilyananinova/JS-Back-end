let fs = require('fs');

let breedList = require('../database/breeds.json');
let add = require('../services/add.js');

function catTemp(req, res) {
    fs.readFile('./views/addCat.html', (err, data) => {
        if (err) {
            throw err;
        } else {
            let result = breedList.breeds.map(b => `<option value="${b}">${b}</option>`);
            data = data.toString().replace('{{breedOptions}}', result);
            res.write(data);
            res.end();
        }
    });
}

function newCat(req, res) {
    add.addCat(req, res);
}

module.exports = {
    catTemp,
    newCat
}