let fs = require('fs');
let formidable = require('formidable');
let uniqid = require('uniqid');

let dbBreeds = require('../database/breeds.json');
let dbCats = require('../database/cats.json');

function addBreed(req) {

    let form = formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        dbBreeds.breeds.push(fields.breed);
        let result = JSON.stringify(dbBreeds, '', 2);
        return fs.writeFileSync('./database/breeds.json', result);
    });
}

function addCat(req) {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        fields.id =  uniqid();
        fields.image = files.image.name;
        dbCats.cats.push(fields);
        let result = JSON.stringify(dbCats, '', 2);
        return fs.writeFileSync('./database/cats.json', result);
    });
}

module.exports = {
    addBreed,
    addCat
};