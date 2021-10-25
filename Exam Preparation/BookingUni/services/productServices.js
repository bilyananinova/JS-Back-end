let Hotel = require('../models/Hotel');
let User = require('../models/User');

exports.getAll = async function () {
    return await Hotel.find({}).lean();
}

exports.getOne = async function (id) {
    return await Hotel.findById(id).lean();
}

exports.create = async function (hotel, city, freeRooms, imgUrl, creator) {
    return await Hotel.create({ hotel, city, freeRooms, imgUrl, creator });
}

exports.edit = async function (id, hotel, city, freeRooms, imgUrl) {

    return await Hotel.findByIdAndUpdate(id,
        { hotel, city, freeRooms, imgUrl },
        { runValidators: true }
    ).lean();
}

exports.deleteHotel = async function (id) {
    return await Hotel.findByIdAndDelete(id);
}

exports.book = async function (hotelId, userId) {
    let hotel = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { usersBooked: userId },
        $inc: { freeRooms: -1 }
    });

    let user = await User.findByIdAndUpdate(userId, {
        $push: { bookedHotels: hotelId }
    });

    return {
        hotel,
        user
    }
}

exports.getProfile = async function (id) {
    return await User.findById(id).populate('bookedHotels').lean();
}
