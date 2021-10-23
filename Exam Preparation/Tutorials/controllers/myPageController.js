let express = require('express');
let router = express.Router();

let { myPage } = require('../services/myPageService');

router.get('/:username', async (req, res) => {

    try {
        
        let courses = await myPage(req.params.username);

        res.render('myProfile', { title: 'Profile Page', courses: courses.join(', ') });

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;