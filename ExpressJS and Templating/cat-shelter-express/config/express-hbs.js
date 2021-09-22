let exphbs = require('express-handlebars');

function setUpHbs(app) {
    app.engine('hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
}

module.exports = setUpHbs;