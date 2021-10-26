let mongoose = require('mongoose');

let playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'All fields are required!'],

    },
    description: {
        type: String,
        required: [true, 'All fields are required!'],
        maxlength: [50, 'The description must be max 50 characters!']
    },
    imgUrl: {
        type: String,
        required: [true, 'All fields are required!'],

    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    usersLiked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: true });

module.exports = mongoose.model('Play', playSchema);