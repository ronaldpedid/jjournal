const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema

const BookSchema = new Schema({
  title: {
    type: String,
    default: 'My Book of skills'
  },
  techniques: [{
    type: Schema.Types.ObjectId,
    ref: 'Technique'
  }],
  noOfTechniques: {
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

module.exports = Book = mongoose.model('Book', BookSchema);