/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const journal = require('../controllers/journal/');
const loginRequired = require('../../middleware/requireLogin');


/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/journal/*', util.asJSON, util.options);

  app.get('/api/journal/', util.asJSON, loginRequired, journal.retrieveJournal);

  //create a new journal entry
  app.post('/api/journal/entry/new', util.asJSON, loginRequired, journal.createEntry);

  //update a single technique
  app.put('/api/journal/entry/:id', util.asJSON, journal.updateEntry);

  //retieve a single journal entry
  app.get('/api/journal/entry/:id', util.asJSON, journal.retrieveEntry);

  //delete a single journal entry
  app.delete('/api/journal/entry/:id/delete', util.asJSON, journal.deleteEntry);
};