let mongoose = require('mongoose');

let houseSchema = new mongoose.Schema({
    homeName:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    homeImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true,
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