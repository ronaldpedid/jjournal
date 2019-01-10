const util = require('../../lib/utils.js'),
  User = require('../../lib/models/user'),
  Journal = require('../../lib/models/userJournal'),
  Entry = require('../../lib/models/entry');


module.exports = {
  createEntry: createEntry,
  retrieveAllEntries: retrieveAllEntries,
  retrieveEntry: retrieveEntry,
  retrieveJournal: retrieveJournal,
  deleteEntry: deleteEntry,
  updateEntry: updateEntry
}



//create a post request to add a new item to the db
async function createEntry(req, res) {
  //declarations
  let user = req.user;
  let rolls = req.body.rolls;
  let rollTime = req.body.rollTime;
  let weightPre = req.body.weightPre;
  let weightPost = req.body.weightPost;
  console.log('weight post: ' + weightPost);

  //calculations
  let calculatedRollTime = rolls * rollTime;
  let weightLost = weightPre - weightPost;
  let averageWeightArray = user.averageWeightArray;
  const mode = arr =>
    arr.length === 0 ? 0 :
      arr.reduce(
        (a, b, i, arr) => (arr.filter(c => c === a).length >= arr.filter(c => c === b).length) ? a : b,
        null
      )

  try {
    const entryModel = new Entry();
    const userModel = new User();

    const newEntry = await entryModel.create(req.body);
    const updatedEntryNum = await userModel.incEntryAmount(user._id, 1);
    const updatedRollNum = await userModel.incSparringMatchesAmount(user._id, rolls);
    const updatedRollTime = await userModel.incSparringMatchesTimeAmount(user._id, calculatedRollTime);
    const updatedAP = await userModel.incAccountPoints(user._id, 2);
    const setCurrentWeight = await userModel.setNewCurrentWeight(user._id, weightPost);
    const setWeightLossAmount = await userModel.setWeightLossAmount(user._id, weightLost);
    const addToAverageWeightArray = await userModel.addToAverageWeightArray(user._id, weightPost);
    const setAverageWeight = await userModel.setAverageWeight(user._id, mode(averageWeightArray));
    const updateEntries = await userModel.addEntryToJournal(user._id, newEntry);


    return res.json({
      newEntry,
      updatedEntryNum,
      updatedRollNum,
      updatedRollTime,
      updatedAP,
      setCurrentWeight,
      setWeightLossAmount,
      updateEntries,
      addToAverageWeightArray,
      setAverageWeight
    });
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ error: true })
  }
}

async function retrieveJournal(req, res) {
  const user = req.user;
  try {
    const journal = user.entries;
    const journalArr = journal.map(journal => journal);
    console.log(journalArr);
    return res.json({
      journal
    })
  }
  catch (err) {
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