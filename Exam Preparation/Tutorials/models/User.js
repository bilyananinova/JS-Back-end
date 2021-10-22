let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'The username should be at least 5 characters long'],
        validate: [/^[a-zA-z0-9]+$/, 'Username consist only english letters and digits']
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'The password should be at least 5 characters long'],
        validate: [/^[a-zA-z0-9]+$/, 'Password consist only english letters and digits']
    },
    enrolledCourses: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Course",
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId
    }
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;
            return next();
        })
});

userSchema.method('validatePass', function (password) {
    return bcrypt.compare(password, this.password)

});

module.exports = mongoose.model('User', userSchema);