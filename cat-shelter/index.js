let http = require('http');
let fs = require('fs');

let homeTemp = require('./handlers/home.js');
let addBreed = require('./handlers/addBreed.js');
let addCat = require('./handlers/addCat.js');
let edit = require('./handlers/editCat.js');
let shelter = require('./handlers/catShelter.js');
let searchResults = require('./handlers/searchCat.js');

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
        res.end();
    }

    if (req.url.endsWith('png') || req.url.endsWith('jpg') || req.url.endsWith('jpeg') && req.method == 'GET') {
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        });

        let img = fs.readFileSync(__dirname + req.url);
        res.write(img);
        res.end();
    }

    if (req.url.endsWith('ico')) {
        res.writeHead(200, {
            'Content-Type': 'image/x-icon'
        });

        let ico = fs.readFileSync(__dirname + req.url);
        res.write(ico);
        res.end();
    }

    if (req.url == '/' && req.method == 'GET') { // **********READ HOME PAGE**********

        homeTemp(req, res);

    } else if (req.url == '/cats/add-breed' && req.method == 'GET') { // **********READ ADD BREED PAGE**********

        addBreed.breedTemp(req, res);

    } else if (req.url == '/cats/add-breed' && req.method == 'POST') {

        addBreed.newBreed(req, res);

        res.writeHead(302, {
            'Location': '/'
        });
        res.end();

    } else if (req.url == '/cats/add-cat' && req.method == 'GET') { // **********READ ADD CAT PAGE**********

        addCat.catTemp(req, res);

    } else if (req.url == '/cats/add-cat' && req.method == 'POST') {

        addCat.newCat(req, res);

        res.writeHead(302, {
            'Location': '/'
        });
        res.end();

    } else if (req.url.startsWith('/cats-edit/') && req.method == 'GET') { // **********READ EDIT CAT INFO PAGE**********

        edit.editCatTemp(req, res);

    } else if (req.url.startsWith('/cats-edit/') && req.method == 'POST') {

        edit.editCat(req);

        res.writeHead(302, {
            'Location': '/'
        });
        res.end();

    } else if (req.url.startsWith('/cats-find-new-home') && req.method == 'GET') { // **********READ FIND NEW HOME PAGE**********

        shelter.catShelterTemp(req, res);

    } else if (req.url.startsWith('/cats-find-new-home') && req.method == 'POST') {

        shelter.shelterCat(req, res);

        res.writeHead(302, {
            'Location': '/'
        });
        res.end();

    } else if (req.url.includes('/search')) {

        searchResults(req, res);

    } else {
        res.statusCode = 404;
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});