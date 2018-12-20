const User = require('../database/datamodels/User'),
  UserJournal = require('./userJournal'),
  Entry = require('../database/datamodels/journal/Entry');

//create a class that uses methods to run async functions
//creates a user journal and assigns it to the owner's userId
class JournalEntry {
  async create({ rolls, rollTime, reflections, weightPre, weightPost, author }) {
    const newEntry = new Entry({
      rolls: rolls,
      rollTime: rollTime,
      reflections: reflections,
      weightPre: weightPre,
      weightPost: weightPost,
      author: author
    });

    await newEntry.save()

    await this.createEntry(newEntry._id);
    await this.addEntryToJournal(newEntry, User);
    return newEntry;
  }

  async addEntryToJournal(entry, owner) {
    console.log('the entry: ' + entry);
    console.log('the owner: ' + owner);
    await owner.entries.push(entry);
  }

  async createEntry(userId) {
    const newEntryModel = new UserJournal();
    await newEntryModel.newEntry(userId)
  }

  async edit(entryId, data) {
    const Entry = await Entry.findOneAndUpdate({ _id: entryId }, data);
    return entry;
  }


}

module.exports = exports.default = JournalEntry;