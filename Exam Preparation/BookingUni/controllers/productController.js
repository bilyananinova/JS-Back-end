let express = require('express');
let router = express.Router();

let { create, getOne, edit, deleteHotel, book } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isOwner, isNotOwner } = require('../middlewares/owner');

router.get('/create', isAuth, (req, res) => {
    res.render('booking pages/create');
});

router.post('/create', isAuth, async (req, res) => {

    let { hotel, city, freeRooms, imgUrl } = req.body;

    try {
        await create(hotel, city, freeRooms, imgUrl, req.user.id);
        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }
        console.log(error);
        res.render('booking pages/create', { hotel, city, freeRooms, imgUrl });
    }
});

router.get('/:id/details', async (req, res) => {

    try {

        if (!req.user) {
            res.redirect('/user/login');
        } else {
            let hotel = await getOne(req.params.id);
            let creator = hotel.creator == req.user?.id;
            let booked = hotel.usersBooked.some(h => h._id == req.user?.id);

            res.render('booking pages/details', { ...hotel, creator, booked });
            
        }

    } catch (error) {

        throw new Error(error.message);
    }
});

router.get('/:id/edit', isOwner, async (req, res) => {

    try {

        let hotel = await getOne(req.params.id);
        res.render('booking pages/edit', { hotel });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.post('/:id/edit', isOwner, async (req, res) => {

    let { hotel, city, freeRooms, imgUrl } = req.body;

    try {

        await edit(req.params.id, hotel, city, freeRooms, imgUrl);

        res.redirect(`/hotel/${req.params.id}/details`);

    } catch (error) {

        console.log(error);
        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('booking pages/edit', { hotel, city, freeRooms, imgUrl });

    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {

        await deleteHotel(req.params.id);

        res.redirect('/');

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/:id/book', isNotOwner, async (req, res) => {

    try {
        await book(req.params.id, req.user.id);

        res.redirect(`/hotel/${req.params.id}/details`);

    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = router;