let express = require('express');
let router = express.Router();

let { getAll, getOne, create, edit, deleteHome, rent } = require('../services/houseServices');

router.get('/housing-for-rent', async (req, res) => {

    try {
        let houses = await getAll();

        res.render('aprt-for-recent', { houses });

    } catch (err) {
        console.log(err);
    }
});

router.get('/create-offer', (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create-offer', async (req, res) => {
    let { homeName, type, year, city, homeImage, description, availablePieces } = req.body;
    let creator = req.user.id;

    try {
        await create(homeName, type, year, city, homeImage, description, availablePieces, creator);
        res.redirect('/houses/housing-for-rent')
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id/details', async (req, res) => {
    try {
            let house = await getOne(req.params.id);
            let creator = house.creator == req.user?.id;
            let rents = house.rented.map(h => h.name).join(', ');
            let inRented = house.rented.find(r => r._id == req.user?.id);

            res.render('details', { title: 'Details Page', ...house, creator, rents, inRented });

    } catch (err) {
        console.log(err);
    }
});

router.get('/:id/rent', async (req, res) => {

    try {
        await rent(req.params.id, req.user.id);

        res.redirect(`/houses/${req.params.id}/details`);

    } catch (err) {
        console.log(err);
    }
});

router.get('/:id/delete', async (req, res) => {

    try {
        await deleteHome(req.params.id);

        res.redirect('/houses/housing-for-rent');

    } catch (err) {
        console.log(err);
    }
});

router.get('/:id/edit', async (req, res) => {

    try {
        let house = await getOne(req.params.id);

        res.render('edit', { title: 'Edit Page', ...house });

    } catch (err) {
        console.log(err);
    }
});

router.post('/:id/edit', async (req, res) => {
    let { homeName, type, year, city, homeImage, description, availablePieces } = req.body;
    let homeId = req.params.id;
    
    try {

        await edit(homeId, homeName, type, year, city, homeImage, description, availablePieces);

        res.redirect(`/houses/${req.params.id}/details`);

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;