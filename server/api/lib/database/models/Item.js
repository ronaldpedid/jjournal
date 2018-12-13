const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema

const ItemSchema = new Schema({
  name: {
    type: 'string',
    required: 'false'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);