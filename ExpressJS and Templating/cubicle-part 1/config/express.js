let express = require('express');
let exphbs = require('express-handlebars');

module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('hbs', exphbs({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //TODO: Setup the static files
    app.use('/static', express.static('static'));
};