/**
 * NPM Modules
 */

/**
 * Local Dependencies
 */
const util = require('../../lib/utils.js'),
  //validate = require('../../lib/validators.js'),
  User = require('../../lib/models/user');



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
    //creates new copy of user model
    const userModel = new User();

    //call create method adding in password, username, email
    //returns a promise, resolve to new user
    //after user is save the journal is getting created

    const newUser = await userModel.create(req.body);
    return res.json(newUser)

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
    const userModel = new User();
    const updatedUser = await userModel.edit(id, req.body);
    return res.json(updatedUser);
  }
  catch (err) {
    console.log(err);
    res.status(302).json({ success: false });
  }
};