//Each user who signs up will be given a journal

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema

const EntrySchema = new Schema({
  rolls: {
    type: Number,
    default: 0
  },
  rollTime: {
    type: Number,
    default: 0
  },
  numOfRolls: {
    type: Number,
    default: 0

  },
  weightPre: {
    type: Number,
    default: 135

  },
  weightPost: {
    type: Number,
    default: 133

  },
  reflections: {
    type: String,
    default: "Today I ..."

  },
  techniqueBook: {
    type: Schema.Types.ObjectId,
    ref: 'Technique'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Entry = mongoose.model('Entry', EntrySchema);