let express = require('express');
let path = require('path');

function initExp(app) {
    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //TODO: Setup the static files
};

module.exports = initExp;