const util = require('../../lib/utils.js');
const Entry = require('../../lib/database/models/journal/Entry');
const Journal = require('../../lib/database/models/journal/Journal');
const User = require('../../lib/database/models/User');
//validate = require('../../lib/validators.js'),

module.exports = {
  createEntry: createEntry,
  retrieveAllEntries: retrieveAllEntries,
  retrieveEntry: retrieveEntry,
  retrieveJournal: retrieveJournal,
  deleteEntry: deleteEntry,
  updateEntry: updateEntry,
  createJournal: createJournal
}

async function createJournal(req, res) {
  return new Promise((resolve, reject) => {
    const newJournal = new Journal({
      title: req.body.title
    });

    console.log(newJournal)
    newJournal.save().then(journal => res.json(journal));
  })
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
  return new Promise((resolve, reject) => {
    const newEntry = new Entry({
      rolls: req.body.rolls,
      rollTime: req.body.rollTime,
      reflections: req.body.reflections,
      weightPre: req.body.weightPre,
      weightPost: req.body.weightPost
    });

    console.log(newEntry)
    newEntry.save().then(entry => res.json(entry));
  })
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