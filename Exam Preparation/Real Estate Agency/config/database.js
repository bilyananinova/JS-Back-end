let mongoose = require('mongoose');

function initDb() {
    return mongoose.connect('mongodb://localhost:27017/agency');
}

module.exports = initDb;