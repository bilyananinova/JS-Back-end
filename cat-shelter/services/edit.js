let formidable = require('formidable');
let fs = require('fs');
let uniqid = require('uniqid');

let dbCats = require('../database/cats.json');

function edit(req, cat) {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }

        fields.id = uniqid();

        if (cat) {
            dbCats.cats.push(fields);
            let index = dbCats.cats.findIndex(c => c.id == cat.id);
            dbCats.cats.splice(index, 1);
        }
        let result = JSON.stringify(dbCats, '', 2);
        return fs.writeFileSync('./database/cats.json', result);
    });
}

module.exports = edit;