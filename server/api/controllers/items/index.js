const util = require('../../lib/utils.js');
const Item = require('../../lib/database/models/Item');
//validate = require('../../lib/validators.js'),

module.exports = {
  createNewItemEntry: createNewItemEntry,
  retrieveItems: retrieveItems,
  retrieveItemEntry: retrieveItemEntry,
  deleteItem: deleteItem
}

//create a post request to add a new item to the db
async function createNewItemEntry(req, res) {
  return new Promise((resolve, reject) => {
    const newItem = new Item({
      name: req.body.name
    });

    newItem.save().then(item => res.json(item));
  })
}

//get a list of all items from the db
async function retrieveItems(req, res) {
  return new Promise((resolve, reject) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => (res.json(items)))
      .catch(err => console.log(err));
  })
}

//delete an item from the db
async function deleteItem(req, res) {
  return new Promise((resolve, reject) => {
    Item.findById(req.params.id)
      .then(item => item.remove()
        .then(() => res.json({ Success: true })));
  })
    .catch(err => res.status(404).json({ success: false }));
}


//get a single item from the db
async function retrieveItemEntry(req, res) {
  return new Promise((resolve, reject) => {
    Item.findById(req.params.id)
      .then(item => (res.json(item)));
  })
    .catch(err => res.status(404).json({ success: false }));
}