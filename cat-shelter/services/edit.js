let formidable = require('formidable');
let fs = require('fs');

let dbCats = require('../database/cats.json');

function edit(req) {
    let form  = formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
        let result = JSON.stringify(dbCats, '', 2);
        return fs.writeFileSync('./database/cats.json', result);
    });
}

module.exports = edit;