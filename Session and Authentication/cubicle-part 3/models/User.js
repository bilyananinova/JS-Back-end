let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);