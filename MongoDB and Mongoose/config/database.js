let mongoose = require('mongoose');

async function initDb() {
  await mongoose.connect('mongodb://localhost:27017/cubes');
}

module.exports = initDb;