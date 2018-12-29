const UserDM = require('../database/datamodels/User'),
  JournalDM = require('../database/datamodels/journal/Journal'),
  EntryDM = require('../database/datamodels/journal/Entry');

//create a class that uses methods to run async functions
//creates a user journal and assigns it to the owner's userId
class UserJournal {
  async create(userId) {
    await JournalDM.create({ owner: userId });
  }

  async createEntry(userId) {
    await EntryDM.create({ owner: userId });

  }
}

module.exports = exports.default = UserJournal;