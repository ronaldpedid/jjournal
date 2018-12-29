const util = require('../../lib/utils.js'),
  User = require('../../lib/models/user')
Entry = require('../../lib/models/entry');


module.exports = {
  createEntry: createEntry,
  retrieveAllEntries: retrieveAllEntries,
  retrieveEntry: retrieveEntry,
  retrieveJournal: retrieveJournal,
  deleteEntry: deleteEntry,
  updateEntry: updateEntry
}



//get a single item from the db
async function retrieveJournal(req, res) {
  return new Promise((resolve, reject) => {
    Journal.findById(req.params.id)
      .then(journal => (res.json(journal)));
  })
    .catch(err => res.status(404).json({ success: false }));
}

//create a post request to add a new item to the db
async function createEntry(req, res) {
  try {
    const entryModel = new Entry();

    const newEntry = await entryModel.create(req.body);
    const updatedUser = await User.incEntryAmount(req.user._id, 1);
    return res.json({ newEntry, updatedUser });
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ error: true })
  }
}


async function updateEntry(req, res) {
  return new Promise((resolve, reject) => {
    Entry.findById(req.params.id)
      .then(entry =>
        entry.save()
          .then(entry => res.json(entry)));
  })
    .catch(err => res.status(404).json({ success: false }));
}

//get a list of all items from the db
async function retrieveAllEntries(req, res) {
  return new Promise((resolve, reject) => {
    Entry.find()
      .sort({ date: -1 })
      .then(entry => (res.json(entry)))
      .catch(err => console.log(err));
  })
}


async function retrieveUserEntries(req, res) {
  return new Promise((resolve, reject) => {
    User.findById(req.user.id)
      .sort({ date: -1 })
      .then(entry => (res.json(entry)))
      .catch(err => console.log(err));
  })
}

//delete an item from the db
async function deleteEntry(req, res) {
  return new Promise((resolve, reject) => {
    Entry.findById(req.params.id)
      .then(entry => entry.remove()
        .then(() => res.json({ Success: true })));
  })
    .catch(err => res.status(404).json({ success: false }));
}


//get a single item from the db
async function retrieveEntry(req, res) {
  return new Promise((resolve, reject) => {
    Entry.findById(req.params.id)
      .then(entry => (res.json(entry)));
  })
    .catch(err => res.status(404).json({ success: false }));
}