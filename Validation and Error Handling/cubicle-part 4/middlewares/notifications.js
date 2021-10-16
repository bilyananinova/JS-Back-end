function notifications (err) {
    let errors = Object.keys(err.errors).map(e => err.errors[e].message);
    return errors;
}

module.exports = notifications;