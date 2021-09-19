let http = require('http');
let fs = require('fs');
let querystring = require('querystring');

let add = require('./services/add.js');
let edit = require('./services/edit.js');
let deleteCat = require('./services/deleteCat.js');
let search = require('./services/search.js');

let breedList = require('./database/breeds.json');
let catsList = require('./database/cats.json');

let port = 3000;

let app = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });


    // **********READ CSS FILE**********
    if (req.url == '/styles/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        let css = fs.readFileSync('./styles/site.css');
        res.write(css);
    }

    let body;

    if (req.url == '/' && req.method == 'GET') { // **********READ HOME PAGE**********

        body = fs.readFileSync('./views/home/index.html');
        let card = catsList.cats.map(c =>
            `<li>
            <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg" alt="${c.name}">
            <h3>${c.name}</h3>
            <p><span>Breed: </span>${c.breed}</p>
            <p><span>Description: </span>${c.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/id=${c.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats-find-new-home/id=${c.id}">New Home</a></li>
            </ul>
        </li>`);

        body = body.toString().replace('{{catCard}}', card);
        res.write(body);
    } else if (req.url == '/cats/add-breed' && req.method == 'GET') { // **********READ ADD BREED PAGE**********

        body = fs.readFileSync('./views/addBreed.html');
        res.write(body);
    } else if (req.url == '/cats/add-breed' && req.method == 'POST') {

        add.addBreed(req)
        res.writeHead(302, {
            'Location': '/'
        });
    } else if (req.url == '/cats/add-cat' && req.method == 'GET') { // **********READ ADD CAT PAGE**********

        body = fs.readFileSync('./views/addCat.html')
        let result = breedList.breeds.map(b => `<option value="${b}">${b}</option>`);
        body = body.toString().replace('{{breedOptions}}', result);
        res.write(body);
    } else if (req.url == '/cats/add-cat' && req.method == 'POST') {

        add.addCat(req)
        res.writeHead(302, {
            'Location': '/'
        });
    } else if (req.url.startsWith('/cats-edit/') && req.method == 'GET') { // **********READ EDIT CAT INFO PAGE**********

        body = fs.readFileSync('./views/editCat.html');

        let cat = fs.readFileSync('./database/cats.json').toString();
        let id = querystring.parse(req.url, '/').id;
        cat = JSON.parse(cat).cats.find(c => c.id == id);

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

        body = body.toString().replace('{{editCat}}', result)

        res.write(body);
    } else if (req.url.startsWith('/cats-edit/') && req.method == 'POST') {
        let cat = fs.readFileSync('./database/cats.json').toString();
        let id = querystring.parse(req.url, '/').id;
        cat = JSON.parse(cat).cats.find(c => c.id == id);

        edit(req, cat)

        res.writeHead(302, {
            'Location': '/'
        });
    } else if (req.url.startsWith('/cats-find-new-home') && req.method == 'GET') { // **********READ FIND NEW HOME PAGE**********

        body = fs.readFileSync('./views/catShelter.html');
        let cat = fs.readFileSync('./database/cats.json').toString();
        let id = querystring.parse(req.url, '/').id;
        cat = JSON.parse(cat).cats.find(c => c.id == id);

        let result = `
            <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg" alt="">
            <label for="name">Name</label>
            <input type="text" id="name" value="${cat.name}" disabled>
            <label for="description">Description</label>
            <textarea id="description" disabled>${cat.description}</textarea>
            <label for="group">Breed</label>
            <select id="group" disabled>
                <option value="${cat.breed}">${cat.breed}</option>
            </select>
            <button type="submit">SHELTER THE CAT</button>`;

        body = body.toString().replace('{{catShelter}}', result)
        res.write(body);
    } else if (req.url.startsWith('/cats-find-new-home') && req.method == 'POST') {

        let id = querystring.parse(req.url, '/').id;

        deleteCat(id);
        res.writeHead(302, {
            'Location': '/'
        });
    } else if (req.url.includes('/search')) {
        let cats = search(req);

        body = fs.readFileSync('./views/home/index.html');

        let card = cats.map(c => `
        <li>
            <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="Black Cat">
            <h3>${c.name}</h3>
            <p><span>Breed: </span>${c.breed}</p>
            <p><span>Description: </span>${c.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/${c.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats-find-new-home/${c.id}">New Home</a></li>
            </ul>
        </li>`);

        body = body.toString().replace('{{catCard}}', card);
        res.write(body);

    } else {
        res.statusCode = 404;
    }

    res.end();

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});