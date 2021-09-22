let express = require('express');
let setUpHbs = require('./config/express-hbs.js');
let router = require('./router.js');

let port = 3000;

let app = express();

app.use((req, res, next) => {
    setUpHbs(app);
    next();
});

app.use(express.static('styles'));
app.use(router);

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});