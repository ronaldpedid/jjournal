const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 12;

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