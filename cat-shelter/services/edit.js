let formidable = require('formidable');
let fs = require('fs');
let uniqid = require('uniqid');

let dbCats = require('../database/cats.json');

function edit(req, cat) {
    let form = formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        fields.id = uniqid();

        if (files['image']) {
            fields.img = files.image.name;
        }

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