let express = require('express');
let router = express.Router();

let { getProfile } = require('../services/productServices');

router.get('/:username', async (req, res) => {
    let profile = await getProfile(req.user.id);

    res.render('user pages/profile', {profile});
});

module.exports = router;