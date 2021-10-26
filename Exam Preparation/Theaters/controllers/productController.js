let express = require('express');
let router = express.Router();

let { create, getOne, edit, deleteHouse, like, getAllByDate, getAllByLikes } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isOwner, isNotOwner } = require('../middlewares/owner');
let { isLike } = require('../middlewares/liked');

router.get('/create', isAuth, (req, res) => {
    res.render('theater pages/create');
});

router.post('/create', isAuth, async (req, res) => {

    let { title, description, imgUrl, isPublic } = req.body;

    try {

        isPublic = isPublic == 'on' ? true : false;

        await create(title, description, imgUrl, isPublic, req.user.id);

        res.redirect('/');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('theater pages/create', { title, description, imgUrl, isPublic });
    }
});

router.get('/:id/details', async (req, res) => {

    try {

        let theater = await getOne(req.params.id);
        let creator = theater.creator == req.user?.id;
        let isLiked = theater.usersLiked.some(r => r._id == req.user?.id);

        res.render('theater pages/details', { ...theater, creator, isLiked });

    } catch (error) {

        throw new Error(error.message);
    }
});

router.get('/:id/edit', isOwner, async (req, res) => {

    try {

        let theater = await getOne(req.params.id);
        res.render('theater pages/edit', { ...theater });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.post('/:id/edit', isOwner, async (req, res) => {

    let { title, description, imgUrl, isPublic } = req.body;

    try {

        await edit(req.params.id, title, description, imgUrl, isPublic);

        res.redirect(`/theater/${req.params.id}/details`)
    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('theater pages/edit', { title, description, imgUrl, isPublic });
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {

        await deleteHouse(req.params.id);

        res.redirect('/');

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/:id/like', isLike, async (req, res) => {

    try {

        await like(req.params.id, req.user.id);

        res.redirect(`/theater/${req.params.id}/details`);

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/sort-likes', async (req, res) => {

    try {

        let theaters = await getAllByLikes();

        res.render(`user-home`, { theaters });

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/sort-date', async (req, res) => {

    try {

        let theaters = await getAllByDate();

        res.render(`user-home`, { theaters });

    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = router; 