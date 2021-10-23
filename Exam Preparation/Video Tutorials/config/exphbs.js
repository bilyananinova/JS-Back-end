let exphbs = require('express-handlebars');

function initHbs(app) {
    
    //TODO: Setup the view engine
    app.engine('hbs', exphbs({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
}

module.exports = initHbs;