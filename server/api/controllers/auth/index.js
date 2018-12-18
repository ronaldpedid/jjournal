/**
 * NPM Modules
 */

/**
 * Local Dependencies
 */
const util = require('../../lib/utils.js'),
  //validate = require('../../lib/validators.js'),
  User = require('../../lib/database/models/User'),
  crypt = require('../../lib/safe');


/**
 * Public Methods
 */
module.exports = {
  signUp: signUp,
  signIn: signIn,
  getCurrentUser: getCurrentUser,
  logoutCurrentUser: logoutCurrentUser,
  editUser: editUser
};

/**
 * Attempts to log the user in
 * @param {*} req 
 * @param {*} res 
 */
async function getCurrentUser(req, res) {
  const user = req.user;
  return res.json({ user });
}


function logoutCurrentUser(req, res) {
  req.logOut();
  res.redirect('/');
}

//STEPS
//1. Verify email doesn't already exist
//2. Save to database

//save the new user
async function signUp(req, res) {
  try {

    //take password and hash it with bcrypt
    let password = await crypt.generatePasswordHash(req.body.password);

    //UPD
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password
    });

    //Save new user to the data base and return the user object
    newUser
      .save()
      .then((user) => {
        res.json(user)
      })
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ error: 'Opps there it is.' })
  }
};


function signIn(req, res) {
  let user = req.user;
  if (!user) {
    res.redirect('/');
    console.log('User cannot be found. Please check user information.');
  }
  return res.json({
    user: user
  })
}

async function editUser(req, res) {
  const id = req.user._id;
  console.log(id)
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { upsert: true })
      .then(user => user.save(user))
  }
  catch (err) {
    console.log(err);
    res.status(302).json({ success: false });
  }
};