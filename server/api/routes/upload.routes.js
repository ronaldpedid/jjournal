/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const upload = require('../controllers/upload/');


/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/upload', util.asJSON, util.options);
  app.post('/api/upload', util.asJSON, upload.upload);
  app.options('/api/uploaded', util.asJSON, util.options);
  app.post('/api/uploaded', util.asJSON, upload.uploaded);
};