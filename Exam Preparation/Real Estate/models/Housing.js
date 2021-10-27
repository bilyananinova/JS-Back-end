let mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [6, 'The Name should be at least 6 characters']
    },
    type: {
        type: String,
        required: [true, 'All fields are required!'],
        enum: ["Apartment", "Villa", "House"],
    },
    year: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [1850, 'The Year should be between 1850 and 2021'],
        max: [2021, 'The Year should be between 1850 and 2021'],
    },
    city: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'The City should be at least 4 characters']
    },
    homeImage: {
        type: String,
        required: [true, 'All fields are required!'],
        validate: [/^https?:\/\//, `ImageUrl is not a valid URL!`]
    },
    description: {
        type: String,
        required: [true, 'All fields are required!'],
        maxlength: [60, 'The Property Description should be maximum of 60 characters']
    },
    availablePieces: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [0, 'The Available Pieces should be positive number (from 0 to 10)'],
        max: [10, 'The Available Pieces should be positive number (from 0 to 10)'],
    },
    rented: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Housing', housingSchema);