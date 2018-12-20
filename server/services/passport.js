const User = require('../api/lib/database/datamodels/User');
const crypt = require('../api/lib/safe')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



module.exports = passport.use(new LocalStrategy({
  username: 'username',
  password: 'password',
},
  function (username, password, done) {

    console.log('inside local strategy');
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        } else if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect username or password' });
        }
      });
    });
  }
));


passport.serializeUser(function (user, done) {
  return done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('error in deserialize', err);
      return done(err);
    }
    done(null, user)
  });
});






