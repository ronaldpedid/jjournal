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
  belongsToJournal: {
    type: Schema.Types.ObjectId,
    ref: 'Journal'
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  author: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = exports.default = Entry = mongoose.model('Entry', EntrySchema);