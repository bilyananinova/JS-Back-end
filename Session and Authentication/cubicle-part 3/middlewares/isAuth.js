let { getById } = require('../services/cubeServices');

function isAuth(req, res, next) {
    getById(req.params.id)
        .then(cube => {
            if (cube.creatorId == res.locals.user._id) {
                res.locals.user.authorized = true;
            }
        })

        next();

}

module.exports = isAuth;