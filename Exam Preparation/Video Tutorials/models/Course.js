let mongoose = require('mongoose');
let { format } = require('date-fns');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'The title should be at least 5 characters long'],

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
    duration: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    usersEnrolled : [
        {
            type: mongoose.Types.ObjectId,
            ref: "Course"
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
    }
});

courseSchema.pre('save', function (next) {
    let date = format(new Date(), "MMM E d H:mm:ss");
    this.createdAt = date
    next();
});

module.exports = mongoose.model('Course', courseSchema);