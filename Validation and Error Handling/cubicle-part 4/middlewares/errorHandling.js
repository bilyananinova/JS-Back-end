function errorHandling(err, req, res, next) {
    if (err) {
        res.locals.errors = err;
    }
}

module.exports = errorHandling;