const User = require('../database/datamodels/User'),
  Book = require('../database/datamodels/techniques/Book'),
  Technique = require('../database/datamodels/techniques/Technique');

//create a class that uses methods to run async functions
//creates a user techbook and assigns it to the owner's userId
class UserTechBook {
  async create(userId) {
    await Book.create({ owner: userId });
  }

  async createTechnique(userId) {
    await Technique.create({ author: userId });

  }


}

module.exports = exports.default = UserTechBook;