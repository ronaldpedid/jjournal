const UserDM = require('../database/datamodels/User'),
  JournalDM = require('../database/datamodels/journal/Journal'),
  EntryDM = require('../database/datamodels/journal/Entry'),
  User = require('../models/user'),
  UserJournal = require('./userJournal');

//create a class that uses methods to run async functions
//creates a user journal and assigns it to the owner's userId
class JournalEntry {
  async create({ rolls, rollTime, reflections, weightPre, weightPost, author, registedBy }) {
    const newEntry = new EntryDM({
      rolls: rolls,
      rollTime: rollTime,
      reflections: reflections,
      weightPre: weightPre,
      weightPost: weightPost,
      author: author
    });


    await newEntry.save();

    return newEntry;
  }

  async edit(entryId, data) {
    const entry = await EntryDM.findOneAndUpdate({ _id: entryId }, data);
    return entry;
  }

}

module.exports = exports.default = JournalEntry;