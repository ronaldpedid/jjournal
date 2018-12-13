/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const item = require('../controllers/items/');


/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/items/*', util.asJSON, util.options);
  app.post('/api/items/new', util.asJSON, item.createNewItemEntry);
  app.get('/api/items/', util.asJSON, item.retrieveItems);
  app.get('/api/items/:id', util.asJSON, item.retrieveItemEntry);
  app.delete('/api/items/:id', util.asJSON, item.deleteItem);

};