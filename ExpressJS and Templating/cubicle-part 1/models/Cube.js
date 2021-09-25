let uniqid = require('uniqid');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.name = name,
        this.description = description,
        this.imageUrl = imageUrl,
        this.difficulty = difficulty,
        this.id = uniqid()
    }
}

module.exports = Cube;