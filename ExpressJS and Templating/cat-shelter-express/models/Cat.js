let uniqid = require('uniqid');

class Cat {
    constructor(name, description, image, breed, id) {
        this.name = name,
            this.description = description,
            this.image = image,
            this.breed = breed,
            this.id = uniqid();
    }
}

module.exports = Cat;