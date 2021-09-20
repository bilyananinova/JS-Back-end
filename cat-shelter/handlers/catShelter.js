let fs = require('fs');
let querystring = require('querystring');

let catList = require('../database/cats.json');
let deleteCat = require('../services/deleteCat.js');

function catShelterTemp(req, res) {
    fs.readFile('./views/catShelter.html', (err, data) => {
        if (err) {
            throw err;
        } else {
            let id = querystring.parse(req.url, '/').id;
            let cat = catList.cats.find(c => c.id == id);

            let result = `
                <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg" alt="${cat.name}">
                <label for="name">Name</label>
                <input type="text" id="name" value="${cat.name}" disabled>
                <label for="description">Description</label>
                <textarea id="description" disabled>${cat.description}</textarea>
                <label for="group">Breed</label>
                <select id="group" disabled>
                    <option value="${cat.breed}">${cat.breed}</option>
                </select>
                <button type="submit">SHELTER THE CAT</button>`;

            data = data.toString().replace('{{catShelter}}', result);
            res.write(data);
            res.end();
        }
    });
}

function shelterCat(req, res) {
    let id = querystring.parse(req.url, '/').id;
    
    deleteCat(id);
}

module.exports = {
    catShelterTemp,
    shelterCat
}