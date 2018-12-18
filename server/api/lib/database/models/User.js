const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    default: '',
    require: true
  },
  firstName: {
    type: String,
    default: '',
    require: false
  },
  lastName: {
    type: String,
    default: '',
    require: false
  },
  email: {
    type: String,
    default: '',
    require: true
  },
  password: {
    type: String,
    default: '',
    require: true
  },
  profilePicture: {
    type: String,
    default: 'https://static1.squarespace.com/static/5076d3a584ae1ac54deb8872/507a2f6ce4b066c1cdd6371d/5b01c9f30e2e7216afc6e4d2/1526843892630/Devin+jiu+jitsu+pic.jpg?format=500w'
  },
  journal: {
    type: Schema.Types.ObjectId,
    ref: 'Journal'
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  hasJournal: {
    type: Boolean,
    default: true
  },
  hasBook: {
    type: Boolean,
    default: true
  },
  hasBlog: {
    type: Boolean,
    default: false
  },
  badges: {
    type: Array,
    default: []
  }
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(undefined, isMatch);
  });
};

module.exports = User = mongoose.model('User', UserSchema);