let express = require('express');
let router = express.Router({ mergeParams: true });

let { getById, attachAccessory } = require('../services/cubeServices')
let { getAllNotIn } = require('../services/accessoryServices')

router.get('/attach', async (req, res) => {
    let cube = await getById(req.params.id);
    let accessories = await getAllNotIn(cube.accessories.map(x => x._id));

    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach', async (req, res) => {

    await attachAccessory(req.params.id, req.body.accessory);
    res.redirect(`/cube/${req.params.id}`);
});

module.exports = router;