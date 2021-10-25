let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    hotel: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [3, 'The name should be at least 3 characters']
    },
    city: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'The name should be at least 4 characters']

    }, 
    imgUrl: {
        type: String,
        required: [true, 'All fields are required!'],
        validate: [/^https?:\/\//i, 'The imageUrl should start with http or https']
    },
    freeRooms: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [1, 'The number of free rooms should be between 1 and 100'],
        max: [100, 'The number of free rooms should be between 1 and 100']
    },
    usersBooked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);