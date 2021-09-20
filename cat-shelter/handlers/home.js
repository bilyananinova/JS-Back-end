let fs = require('fs');

let catsList = require('../database/cats.json');

function homeTemp(req, res) {
    fs.readFile('./views/home/index.html', (err, data) => {
        if (err) {
            throw err;
        } else {
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

            data = data.toString().replace('{{catCard}}', card);
            res.write(data);
            res.end();
        }
    });
}

module.exports = homeTemp;