let mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name should be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9 ]+$/, 'Name should consist only of English letters, digits and whitespaces']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters long'],
        validate: [/^[a-zA-Z0-9 ]+$/, 'Description should consist only of English letters, digits and whitespaces']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, `ImageUrl is not a valid URL!`]
    },
    cubes:
    {
        type: mongoose.Types.ObjectId,
        ref: "Cube"
    }

});

module.exports = mongoose.model('Accessory', accessorySchema);