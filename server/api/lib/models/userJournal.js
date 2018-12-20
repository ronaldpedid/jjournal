const User = require('../database/datamodels/User'),
  Journal = require('../database/datamodels/journal/Journal'),
  Entry = require('../database/datamodels/journal/Entry');

//create a class that uses methods to run async functions
//creates a user journal and assigns it to the owner's userId
class UserJournal {
  async create(userId) {
    await Journal.create({ owner: userId });
  }

  async newEntry(userId) {
    await Entry.create({ author: userId });
  }
}

module.exports = exports.default = UserJournal;