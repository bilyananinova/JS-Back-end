let express = require('express');
let setUpHbs = require('./config/express-hbs.js');

let port = 3000;

let app = express();

setUpHbs(app);
app.use(express.static('styles'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});