let fs = require('fs');

let dbCats = require('../database/cats.json');

function deleteCat(id) {
    let index = dbCats.cats.findIndex(c => c.id == id)
    dbCats.cats.splice(index, 1);
    let result = JSON.stringify(dbCats, '', 2);
    return fs.writeFileSync('./database/cats.json', result);
}

module.exports = deleteCat;