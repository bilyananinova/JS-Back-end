let mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\//.test(value);
            },
            message: props => `${props.value} is not a valid address!`
        },
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ]
});

module.exports = mongoose.model('Cube', cubeSchema);