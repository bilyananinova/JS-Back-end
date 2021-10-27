let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'All fields are required!'],
    },
    password: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Password should be at least 4 characters long']
    },
    gender: {
        type: String,
        required: [true, 'All fields are required!'],
    },
    tripHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Trip"
        }
    ]
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;
            return next();
        });
});

userSchema.method('validatePass', function (password) {
    return bcrypt.compare(password, this.password)

});

module.exports = mongoose.model('User', userSchema);