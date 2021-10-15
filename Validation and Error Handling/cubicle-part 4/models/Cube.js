let mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name should be at least 5 characters long'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, `ImageUrl is not a valid URL!`]
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    creatorId: {
        type: String,
        required: true,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ]
});

module.exports = mongoose.model('Cube', cubeSchema);