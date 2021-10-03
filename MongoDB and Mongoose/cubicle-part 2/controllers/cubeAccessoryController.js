let express = require('express');
let router = express.Router({mergeParams: true});
let { getById } = require('../services/cubeServices')

router.get('/attach', async (req, res) => {
    let cube = await getById(req.params.id);
    res.render('attachAccessory', { cube });
});


module.exports = router;