let mongoose = require('mongoose');

let houseSchema = new mongoose.Schema({
    homeName: {
        type: String,
        required: true,
        minlength: [6, 'Name should be at least 6 characters']
    },
    type: {
        type: String,
        required: true,
        enum: ['House', 'Villa', 'Apartment']
    },
    year: {
        type: Number,
        required: true,
        min: [1850, 'Year should be between 1850 and 2021'],
        max: [2021, 'Year should be between 1850 and 2021']
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'City should be at least 4 characters long']
    },
    homeImage: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, `ImageUrl is not a valid URL!`]
    },
    description: {
        type: String,
        required: true,
        maxlength: [60, 'Property Description should be a maximum of 60 characters long.']
    },
    availablePieces: {
        type: Number,
        required: true,
        min: [0, 'Available Pieces should be positive number (from 0 to 10)'],
        max: [10, 'Available Pieces should be positive number (from 0 to 10)']
    },
    rented: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('House', houseSchema);