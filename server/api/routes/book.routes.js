/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const book = require('../controllers/book/');
const loginRequired = require('../../middleware/requireLogin');


/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/technique_book/*', util.asJSON, util.options);

  //add a technique to skillbook
  app.post('/api/technique_book/technique/new', util.asJSON, loginRequired, book.registerTechnique);

  //update a single technique
  app.put('/api/technique_book/technique/:id', util.asJSON, book.updateTechnique);

  //retrieve data from skillbook
  app.get('/api/technique_book/:id', util.asJSON, book.retrieveBook);
  app.get('/api/technique_book/technique/:id', util.asJSON, book.retrieveTechnique);

  //delete a single technique
  app.delete('/api/technique_book/:id', util.asJSON, loginRequired, book.deleteTechnique);
};