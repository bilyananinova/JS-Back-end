let express = require('express');
let router = express.Router();

let { getAll, create, getOne, edit, deleteHouse, rent } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isOwner, isNotOwner } = require('../middlewares/owner');

router.get('/', async (req, res) => {

    let housing = await getAll();
    res.render('aprt-for-recent', { page: 'Catalog', housing });
});

router.get('/create-offer', isAuth, (req, res) => {
    res.render('create', { page: 'Create Page' });
});

router.post('/create-offer', isAuth, async (req, res) => {

    let { name, type, year, city, homeImage, description, availablePieces } = req.body;

    try {

        await create(name, type, year, city, homeImage, description, availablePieces, req.user.id);

        res.redirect('/housing');

    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('create', { name, type, year, city, homeImage, description, availablePieces });
    }
});

router.get('/:id/details', async (req, res) => {

    try {

        let housing = await getOne(req.params.id);
        let creator = housing.owner == req.user?.id;
        let isRented = housing.rented.some(r => r._id == req.user?.id);

        res.render('details', { page: 'Details Page', ...housing, creator, isRented });

    } catch (error) {

        throw new Error(error.message);
    }
});

router.get('/:id/edit', isOwner, async (req, res) => {

    try {

        let housing = await getOne(req.params.id);
        res.render('edit', { page: 'Edit Page', ...housing });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.post('/:id/edit', isOwner, async (req, res) => {

    let { homeName, type, year, city, homeImage, description, availablePieces } = req.body;

    try {

        await edit(req.params.id, name, type, year, city, homeImage, description, availablePieces);

        res.redirect(`/housing/${req.params.id}/details`)
    } catch (error) {

        if (error.name == 'ValidationError') {
            res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        } else {
            res.locals.errors = [error.message];
        }

        res.render('edit', { page: 'Edit Page', homeName, type, year, city, homeImage, description, availablePieces });

    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {

        await deleteHouse(req.params.id);

        res.redirect('/housing');

    } catch (error) {
        throw new Error(error.message);
    }
});

router.get('/:id/rent', isNotOwner, async (req, res) => {
    try {
        await rent(req.params.id, req.user.id);
        res.redirect(`/housing/${req.params.id}/details`);

    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = router;