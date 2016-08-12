'use strict';

// Load the module dependencies
var surveyTemplate = require('../../controllers/api/surveyTemplateController.js');

// Define the routes module' method
module.exports = function(app) {
  app.post('/api/surveyTemplate/create', surveyTemplate.create);
  app.get('/api/surveyTemplate/selectedUser/:id', surveyTemplate.bySelectedUser)

  app.post('/api/surveyTemplate/update/:id', surveyTemplate.update);


  //app.post('/api/surveyTemplate/schedule', surveyTemplate.schedule);
}
