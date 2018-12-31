const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    default: '',
    require: true,
    unique: true
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
  entries: {
    type: Array,
    default: []

  },
  numOfEntries: {
    type: Number,
    default: 0
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  numOfTechniques: {
    type: Number,
    default: 0
  },
  totalSparringMatches: {
    type: Number,
    default: 0
  },
  totalSparringTime: {
    type: Number,
    default: 0
  },
  currentWeight: {
    type: Number,
    default: 0
  },
  averageWeight: {
    type: Number,
    default: 0
  },
  averageWeightArray: {
    type: Array,
    default: []
  },
  recentWeightLoss: {
    type: Number,
    default: 0
  },
  hasWritePermissions: {
    type: Boolean,
    default: false
  },
  accountPoints: {
    type: Number,
    default: 5
  },
  beltRank: {
    type: String,
    default: 'white'
  },
  beltStripesNum: {
    type: Number,
    min: 0,
    max: 4,
    default: 0
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    default: 'None Specified'
  },
  country: {
    type: String
  },
  currentSchool: {
    type: String
  },
  private: {
    type: Boolean,
    default: 'false'
  },
  isAdmin: {
    type: Boolean,
    default: 'false'
  },
  isModerator: {
    type: Boolean,
    default: 'false'
  },
  badges: {
    type: Array,
    default: [{
      badgeName: 'Welcome Badge',
      worth: 10,
      unlockedBy: 'Signing up a new account.',
      image: '/assets/logos/jjlogo.png'
    }]
  }
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(undefined, isMatch);
  });
};

module.exports = exports.default = User = mongoose.model('User', UserSchema);