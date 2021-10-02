let exphbs = require('express-handlebars');
let path = require('path');

function initHbs(app) {

    //TODO: Setup the view engine
    app.set('views', path.resolve(__dirname, '../views'));
    app.engine('hbs', exphbs({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
};

module.exports = initHbs;
