let express = require('express');
let path = require('path')
let setUpHbs = require('./config/express-hbs.js');

let port = 3000;
let app = express();

setUpHbs(app);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./router'));

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});

