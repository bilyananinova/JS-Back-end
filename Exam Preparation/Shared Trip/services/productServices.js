let Trip = require('../models/Trip');
let User = require('../models/User');

exports.getAll = async function () {
    return await Trip.find({}).lean();
}

exports.getOne = async function (id) {
    return await Trip.findById(id).populate('creator').populate('buddies').lean();
}

exports.create = async function (startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator) {
    return await Trip.create({ startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator });
}

exports.edit = async function (id, startPoint, endPoint, date, time, carImage, carBrand, seats, price, description) {

    return await Trip.findByIdAndUpdate(id,
        { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description },
        { runValidators: true }
    ).lean();
}

exports.deleteTrip = async function (id) {
    return await Trip.findByIdAndDelete(id);
}

exports.join = async function (tripId, userId) {
    return await Trip.findByIdAndUpdate(tripId, {
        $push: { buddies: userId },
        $inc: { seats: -1 }
    });
}

exports.history = async function (userId, id) {
    return await User.findByIdAndUpdate(userId, {
        $push: { tripHistory: id }
    });
}