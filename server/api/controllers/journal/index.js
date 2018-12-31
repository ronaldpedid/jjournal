const util = require('../../lib/utils.js'),
  User = require('../../lib/models/user'),
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
  let user = req.user;
  let calculatedRollTime = req.body.rolls * req.body.rollTime;
  let weightLoss = req.body.weightPre - req.body.weightPost;
  let averageWeightArray = user.averageWeightArray;
  let averageWeightArrayLength = user.averageWeightArray.length;
  let old_average = user.averageWeight;
  let new_weight = req.body.weightPost;
  let new_average = ((old_average * averageWeightArrayLength) + new_weight) / (averageWeightArray + 1);
  let roundedAverage = Math.round(new_average);
  console.log('old average: ' + old_average);
  console.log('new average: ' + new_average);
  try {
    const entryModel = new Entry();
    const userModel = new User();

    const newEntry = await entryModel.create(req.body);
    const updatedEntryNum = await userModel.incEntryAmount(user._id, 1);
    const updatedRollNum = await userModel.incSparringMatchesAmount(user._id, req.body.rolls);
    const updatedRollTime = await userModel.incSparringMatchesTimeAmount(user._id, calculatedRollTime);
    const updatedAP = await userModel.incAccountPoints(user._id, 2);
    const setCurrentWeight = await userModel.setNewCurrentWeight(user._id, req.body.weightPost);
    const setWeightLossAmount = await userModel.setWeightLossAmount(user._id, weightLoss);
    const updateEntries = await userModel.addEntryToJournal(user._id, newEntry);
    const addToAverageWeightArray = await userModel.addToAverageWeightArray(user._id, req.body.weightPost);
    const setAverageWeight = await userModel.setAverageWeight(user._id, roundedAverage);

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