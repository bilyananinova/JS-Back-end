let fs = require('fs');

let search = require('../services/search.js');

function searchResults(req, res) {
    let cats = search(req);

    fs.readFile('./views/home/index.html', (err, data) => {
        if (err) {
            throw err;
        } else {
            let cards = cats.map(c => `
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

            data = data.toString().replace('{{catCard}}', cards);
            res.write(data);
            res.end();
        }
    });
}

module.exports = searchResults