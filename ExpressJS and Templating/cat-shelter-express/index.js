let express = require('express');
let setUpHbs = require('./config/express-hbs.js');

let port = 3000;
let app = express();

setUpHbs(app);
app.use(express.static('styles'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./router'));

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});

