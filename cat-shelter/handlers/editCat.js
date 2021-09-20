let fs = require('fs');
let querystring = require('querystring');

let catList = require('../database/cats.json');
let edit = require('../services/edit.js');

function editCatTemp(req, res) {
    fs.readFile('./views/editCat.html', (err, data) => {
        if (err) {
            console.log(err);;
        } else {
            let id = querystring.parse(req.url, '/').id;
            let cat = catList.cats.find(c => c.id == id);

            let result = `
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${cat.name}">
            <label for="description">Description</label>
            <textarea name="description" id="description">${cat.description}</textarea>
            <label for="image">Image</label>
            <input type="file" id="image">
            <label for="group">Breed</label>
            <select name="breed"  id="group">
                <option value="${cat.breed}">${cat.breed}</option>
            </select>
            <button type="submit">Edit Cat</button>`;

            data = data.toString().replace('{{editCat}}', result);

            res.write(data);
            res.end();
        }
    });
}

function editCat(req, res) {
    let id = querystring.parse(req.url, '/').id;
    let cat = catList.cats.find(c => c.id == id);

    edit(req, cat);
}

module.exports = {
    editCatTemp,
    editCat
}