'use strict';

// Load the module dependencies
var survey = require('../../controllers/api/survey.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/api/survey', survey.create);
  app.get('/api/survey', survey.list);
  app.post('/api/survey/:id', survey.update);
  app.post('/api/survey/remove/:id', survey.delete);
}
