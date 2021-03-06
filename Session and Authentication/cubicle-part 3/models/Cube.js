let mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\//.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
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