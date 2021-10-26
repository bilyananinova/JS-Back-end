let mongoose = require('mongoose');
let { CONNECTION_STRING } = require('../config/constants');

function initDb() {
    return mongoose.connect(CONNECTION_STRING);
}

module.exports = initDb;