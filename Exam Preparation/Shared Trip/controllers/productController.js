let express = require('express');
let router = express.Router();

let { getAll, create, getOne, edit, deleteTrip, join, history } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isOwner, isNotOwner } = require('../middlewares/owner');
let { isJoined } = require('../middlewares/joined');

router.get('/offer-trips', isAuth, (req, res) => {
    res.render('trip-create', { title: 'Offer Trip' });
});

router.post('/offer-trips', isAuth, async (req, res) => {

    let { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;

    try {

        let trip = await create(startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, req.user.id);
        await history(req.user.id, trip._id)

        res.redirect('/trips/shared-trips');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message)[0];

        } else {
            res.locals.errors = [error.message][0];
        }

        res.render('trip-create', { title: 'Offer Trip', startPoint, endPoint, date, time, carImage, carBrand, seats, price, description });
    }
});

router.get('/shared-trips', async (req, res) => {

    try {

        let trips = await getAll();
        // let creator = housing.owner == req.user?.id;
        // let isRented = housing.rented.some(r => r._id == req.user?.id);

        res.render('shared-trips', { title: 'Shared Trips', trips });

    } catch (error) {

        throw new Error(error.message);
    }
});

router.get('/:id/details', async (req, res) => {

    try {

        let trip = await getOne(req.params.id);
        let creator = trip.creator._id == req.user?.id;
        let email = trip.creator.email;
        let buddy = trip.buddies.some(t => t._id == req.user?.id);

        res.render('trip-details', { title: 'Details Trip', ...trip, creator, email, buddy });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.get('/:id/edit', isOwner, async (req, res) => {

    try {

        let trip = await getOne(req.params.id);
        res.render('trip-edit', { title: 'Edit Trip', ...trip });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.post('/:id/edit', isOwner, async (req, res) => {

    let { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;

    try {

        await edit(req.params.id, startPoint, endPoint, date, time, carImage, carBrand, seats, price, description);

        res.redirect(`/trips/${req.params.id}/details`)
    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('trip-edit', { title: 'Edit Page', startPoint, endPoint, date, time, carImage, carBrand, seats, price, description });
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {

        await deleteTrip(req.params.id);

        res.redirect('/trips/shared-trips');

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/:id/join', isJoined, async (req, res) => {

    try {

        await join(req.params.id, req.user.id);

        res.redirect(`/trips/${req.params.id}/details`);

    } catch (error) {

        throw new Error(error.message);

    }
});

module.exports = router;