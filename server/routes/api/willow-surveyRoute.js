'use strict';

// Load the module dependencies
var survey = require('../../controllers/api/willow-surveyController.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/willow/survey', survey.create);
  app.get('/willow/survey', survey.list);
  
}
