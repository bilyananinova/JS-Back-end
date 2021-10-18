let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[A-Z][a-z]+ [A-Z][a-z]+/, 'The name should be in the following format "Alexandur Petrov"']
    },
    username: {
        type: String,
        required: true,
        minlength: [5, 'The username should be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'The password should be at least 4 characters long']
    }
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;
            return next();
        }) 
});

userSchema.method('validatePass', function(password) {
    return bcrypt.compare(password, this.password)
    
});

module.exports = mongoose.model('User', userSchema);