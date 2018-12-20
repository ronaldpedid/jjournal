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
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Technique = mongoose.model('Technique', TechniqueSchema);