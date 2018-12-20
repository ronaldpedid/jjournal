/**
 * Local Dependencies
 */
const util = require('../lib/utils.js');
const journal = require('../controllers/journal/');


/**
 * Routes
 */
module.exports = function (app) {
  app.options('/api/journal/*', util.asJSON, util.options);

  //create a new journal entry
  app.post('/api/journal/entry/new', util.asJSON, journal.createEntry);

  //retieve a journal
  app.get('/api/journal/:id', util.asJSON, journal.retrieveJournal);

  //update a single technique
  app.put('/api/journal/entry/:id', util.asJSON, journal.updateEntry);

  //retieve a single journal entry
  app.get('/api/journal/entry/:id', util.asJSON, journal.retrieveEntry);

  //delete a single journal entry
  app.delete('/api/journal/:id', util.asJSON, journal.deleteEntry);
};