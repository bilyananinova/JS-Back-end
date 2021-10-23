let express = require('express');
let router = express.Router();

let { create, getOne, edit, deleteProduct, enroll } = require('../services/productServices');
let { isAuth, isGuest } = require('../middlewares/auth');
let { isNotOwner, isOwner, isEnrolled } = require('../middlewares/owner');

router.get('/create', isAuth, (req, res) => {
    res.render('course pages/create-course');
});

router.post('/create', isAuth, async (req, res) => {

    let { title, description, imageUrl, duration } = req.body;

    try {

        await create(title, description, imageUrl, duration, req.user.id);

        res.redirect('/');

    } catch (error) {

        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);

        return res.render('course pages/create-course', { title, description, imageUrl, duration });
    }
});

router.get('/:id/details', isAuth, async (req, res) => {

    try {

        let course = await getOne(req.params.id);
        let creator = course.creator == req.user?.id;
        let enroll = course.usersEnrolled.some(c => c._id == req.user?.id);

        res.render('course pages/course-details', { ...course, creator, enroll });

    } catch (error) {

        throw new Error(error.message);
    }
});

router.get('/:id/edit', isOwner, async (req, res) => {


    try {

        let course = await getOne(req.params.id);
        res.render('course pages/edit-course', { ...course });

    } catch (error) {

        throw new Error(error.message);

    }
});

router.post('/:id/edit', isOwner, async (req, res) => {
    let { title, description, imageUrl, duration } = req.body;

    try {

        await edit(req.params.id, title, description, imageUrl, duration);

        res.redirect(`/course/${req.params.id}/details`)
    } catch (error) {

        res.locals.errors = Object.keys(error.errors).map(e => error.errors[e].message);
        return res.render('course pages/edit-course', { title, description, imageUrl, duration });

    }
});

router.get('/:id/delete', isOwner, async (req, res) => {

    try {

        await deleteProduct(req.params.id);

        res.redirect('/');

    } catch (error) {

        throw new Error(error.message);

    }
});

router.get('/:id/enroll', isEnrolled, async (req, res) => {

    try {

        await enroll(req.params.id, req.user.id);

        res.redirect(`/course/${req.params.id}/details`)

    } catch (error) {

        throw new Error(error.message);

    }
});

module.exports = router;