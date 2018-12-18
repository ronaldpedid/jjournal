/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const auth = require('../controllers/auth/');
const passport = require('passport');
require('../../services/passport');
const requireLogin = require('../../middleware/requireLogin');


/**
 * Routes
 */
module.exports = function (app) {
  // OPTIONS
  app.options('/api/account/*', util.asJSON, util.options);

  //GET
  app.get('/api/account/signin', util.asJSON, auth.signIn);
  app.get('/api/current_user', util.asJSON, requireLogin, auth.getCurrentUser);
  app.get('/api/account/logout', auth.logoutCurrentUser);


  //PUT
  app.put('/api/account/:id', util.asJSON, requireLogin, auth.editUser)

  //POST
  app.post('/api/account/signup', util.asJSON, auth.signUp);
  app.post('/api/account/login',
    passport.authenticate('local', {
      success: '/',
      failure: '/api/account/login'
    }),
    function (req, res) {
      console.log(req.user.username + ' is logged in.');
      res.redirect('/');
    }
  )
};