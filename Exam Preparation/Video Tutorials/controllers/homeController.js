let express = require('express');
let router = express.Router();

let { getAllAsc, getAll, search } = require('../services/productServices');

router.get('/', async (req, res) => {

    try {
        if (req.user) {
            let courses = await getAllAsc();

            res.render('home pages/user-home', { courses });
        } else {
            let courses = await getAll();
            courses = courses.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length);

            res.render('home pages/guest-home', { courses });
        }
    } catch (error) {
        throw new Error(error.message)
    }
});

router.get('/search', async (req, res) => {

    try {
        let courses =  await search(req.query.search);
        
        res.render('home pages/user-home', { courses });
    } catch (error) {
        throw new Error(error.message)
    }
});

module.exports = router;