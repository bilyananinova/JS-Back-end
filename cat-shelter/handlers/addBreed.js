let fs = require('fs');

let add = require('../services/add.js');

function breedTemp(req, res) {
    fs.readFile('./views/addBreed.html', (err, data) => {
        if (err) {
            throw err;
        } else {
            res.write(data);
            res.end();
        }
    });
}

function newBreed(req, res) {
    add.addBreed(req, res);
}

module.exports = {
    breedTemp,
    newBreed
};