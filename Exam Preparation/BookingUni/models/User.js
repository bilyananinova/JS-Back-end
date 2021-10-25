let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'All fields are required!'],

    },
    username: {
        type: String,
        required: [true, 'All fields are required!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [5, 'The password should be at least 5 characters long'],
    },
    bookedHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    offeredHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
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