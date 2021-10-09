let express = require('express');
let router = express.Router({ mergeParams: true });

let { getById, attach } = require('../services/cubeServices.js');
let { getAllWithout } = require('../services/accessoryService.js');

router.get('/attach', async (req, res) => {
    let cube = await getById(req.params.id);
    let accessories = await getAllWithout(cube.accessories.map(acc => acc._id));
    res.render('accessory/attachAccessory', { ...cube, accessories });
});

router.post('/attach', (req, res) => {
    attach(req.params.id, req.body.accessory)
        .then(cube => {
            res.redirect(`/cube/details/${req.params.id}`);
        });
});

module.exports = router;