let express = require('express');
let router = express.Router();

let { getOne, create, deleteProduct, edit, enrolled } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isOwner, isNotOwner } = require('../middlewares/owner');

router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isAuth, async (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;


    try {
        isPublic = isPublic == 'on' ? true : false;

        await create(title, description, imageUrl, isPublic, req.user.id);

        res.redirect('/');

    } catch (error) {

        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);

        return res.render('create', { title: 'Create Page', title, description, imageUrl, isPublic });
    }
});

router.get('/:id/details', async (req, res) => {

    try {
        let course = await getOne(req.params.id);
        let creator = req.user?.id == course.creator;
        let enrolled = course.usersEnrolled.find(e => e._id == req.user?.id);

        res.render('details', { title: 'Details Page', ...course, creator, enrolled });

    } catch (error) {

        console.log(error);
    }
});

router.get('/:id/enroll', isNotOwner, async (req, res) => {

    try {
        await enrolled(req.params.id, req.user.id);

        res.redirect(`/product/${req.params.id}/details`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {
        await deleteProduct(req.params.id);

        res.redirect(`/`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id/edit', isOwner, async (req, res) => {

    try {
        let course = await getOne(req.params.id);

        res.render('edit', { title: 'Edit Page', ...course });

    } catch (error) {
        console.log(error);
    }
});

router.post('/:id/edit', isOwner, async (req, res) => {

    let { title, description, imageUrl, isPublic } = req.body;

    try {
        isPublic = isPublic == 'on' ? true : false;
        await edit(req.params.id, title, description, imageUrl, isPublic);

        res.redirect(`/product/${req.params.id}/details`);

    } catch (error) {
        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        res.render('edit', { title: 'Edit Page' });
    }
});

module.exports = router;