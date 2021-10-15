let express = require('express');

function initExp(app) {

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //TODO: Setup the static files
    app.use(express.static('static'));
}

module.exports = initExp;