let http = require('http');
let fs = require('fs');

let port = 3000;

let app = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    switch (req.url) {

        // **********READ CSS FILE**********
        case '/styles/site.css':
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            let css = fs.readFileSync('./styles/site.css');
            res.write(css);
            break;

        // **********READ HOME PAGE**********
        case '/':
            let home = fs.readFileSync('./views/home/index.html');
            res.write(home);
            res.end();
            break;

        // **********READ ADD BREED PAGE**********
        case '/cats/add-breed':
            let addBreed = fs.readFileSync('./views/addBreed.html');
            res.write(addBreed);
            break;

        // **********READ ADD CAT PAGE**********
        case '/cats/add-cat':
            let addCat = fs.readFileSync('./views/addCat.html');
            res.write(addCat);
            break;

        // **********READ EDIT CAT INFO PAGE**********
        case '/cats-edit':
            let editCat = fs.readFileSync('./views/editCat.html');
            res.write(editCat);
            break;

        // **********READ FIND NEW HOME PAGE**********
        case '/cats-find-new-home':
            let catShelter = fs.readFileSync('./views/catShelter.html');
            res.write(catShelter);
            break;

        default:
            res.statusCode = 404;
            break;

    }

    res.end();

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});