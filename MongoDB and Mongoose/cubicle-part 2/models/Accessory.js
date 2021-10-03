let mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);