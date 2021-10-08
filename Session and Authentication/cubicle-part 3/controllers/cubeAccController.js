let express = require('express');
let router = express.Router({ mergeParams: true });

let { getById, attach, outlet } = require('../services/cubeServices.js');
let { getAll } = require('../services/accessoryService.js');

router.get('/attach', async (req, res) => {
    let cube = await getById(req.params.id);
    let accessories = await outlet();
    res.render('accessory/attachAccessory', { ...cube, accessories });
});

router.post('/attach', (req, res) => {
    attach(req.params.id, req.body.accessory)
        .then(cube => {
            res.redirect(`/cube/details/${req.params.id}`);
        });
});

module.exports = router;