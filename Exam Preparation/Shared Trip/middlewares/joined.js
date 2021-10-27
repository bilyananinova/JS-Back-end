let Trip = require('../models/Trip');

exports.isJoined = async function(req, res, next) {
    let trip = await Trip.findById(req.params.id); 
    let buddy = trip.buddies.some(t => t._id == req.user?.id);
    let creator = trip.creator;

    if(req.user && !buddy && creator) {
        next();
    }

}

