/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const test = require('../controllers/test/');



/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/test/', util.asJSON, util.options);
  app.post('/api/test/', util.asJSON, test.returnPosted);
  app.get('/api/test/', util.asJSON, test.returnData);
  app.get('/api/test/user', util.asJSON, test.returnUser);
  app.post('/api/test/user', util.asJSON, test.returnUser);
};