let mongoose = require('mongoose');
let moment = require('moment');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [4, 'The title should be at least 4 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'The description should be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'The imageUrl should start with http or https']
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        required: true,
        type: String,
        default: Date.now
    },
    usersEnrolled: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
    }

});

courseSchema.pre('save', function (next) {
    let date = Date.now();
    this.createdAt = moment(date).format('DD/MM/YYYY');
    return next();
});

module.exports = mongoose.model('Course', courseSchema);