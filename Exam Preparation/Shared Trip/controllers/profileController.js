let express = require('express');
let router = express.Router();

let User = require('../models/User');

router.get('/:email', async (req, res) => {
    let user = await User.findById(req.user.id).populate('tripHistory').lean();

    res.render('profile', { title: 'Profile Page', user })
})


module.exports = router;