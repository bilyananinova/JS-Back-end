let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;
            next();
        }) 
});

module.exports = mongoose.model('User', userSchema);