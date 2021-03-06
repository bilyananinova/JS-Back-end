let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let salt = 9;

let userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [5, 'Username should be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consist only of English letters and digits'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should be at least 8 characters long'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should consist only of English letters and digits']
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, salt)
        .then(hash => {
           this.password = hash;
           next();
        });
})

module.exports = mongoose.model('User', userSchema);