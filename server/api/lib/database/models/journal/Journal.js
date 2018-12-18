const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema

const JournalSchema = new Schema({
  title: {
    type: String,
    default: 'My Jiu-Jitsu Journey'
  },
  entries: [{
    type: Schema.Types.ObjectId,
    ref: 'Entry'
  }],
  noOfEntries: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Journal = mongoose.model('Journal', JournalSchema);