//Each user who signs up will be given a journal

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema

const TechniqueSchema = new Schema({
  name: {
    type: String,
  },
  positionFrom: {
    type: String
  },
  desc: {
    type: String
  },
  videoUrl: {
    type: String,
    default: 'https://www.youtube.com/watch?v=pw_9ZZLkkNI'
  },
  belongsToBook: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  registeredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = exports.default = Technique = mongoose.model('Technique', TechniqueSchema);