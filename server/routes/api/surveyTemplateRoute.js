'use strict';

// Load the module dependencies
var surveyTemplate = require('../../controllers/api/surveyTemplateController.js');

// Define the routes module' method
module.exports = function(app) {
  app.post('/api/surveyTemplate/create', surveyTemplate.create);
  app.post('/api/surveyTemplate/update/:id', surveyTemplate.update);
  app.get('/api/surveyTemplate/selectedUser/:id', surveyTemplate.selectedByUser);

  //app.post('/api/surveyTemplate/schedule', surveyTemplate.schedule);
}
