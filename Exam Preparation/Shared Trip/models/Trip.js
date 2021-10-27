let mongoose = require('mongoose');

let tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Start point should be at least 4 characters long']
    },
    endPoint: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'End point should be at least 4 characters long']
    },
    date: {
        type: String,
        required: [true, 'All fields are required!'],
    },
    time: {
        type: String,
        required: [true, 'All fields are required!'],
    },
    carImage: {
        type: String,
        required: [true, 'All fields are required!'],
        validate: [/^https?:\/\//i, 'Car image should start with http or https']
    },
    carBrand: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Car brand should be at least 4 characters long']
    },
    seats: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [0, 'Seats should be positive number from 0 to 4 inclusive'],
        max: [4, 'Seats should be positive number from 0 to 4 inclusive'],
    },
    price: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [0, 'Price should be positive number from 0 to 50 inclusive'],
        max: [50, 'Price should be positive number from 0 to 50 inclusive'],
    },
    description: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [10, 'Description should be minimum 10 characters long.']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model('Trip', tripSchema);