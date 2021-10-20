exports.errorHandller = function (error) {
    return Object.keys(error.errors).map(e => error.errors[e].message);
}