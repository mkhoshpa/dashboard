'use strict';

// Load the module dependencies
var user = require('../../controllers/user.info.controller.js');

// Define the routes module' method
module.exports = function(app) {

  app.post('/api/user/create', user.create);
  app.post('/api/user/delete/:id', user.delete);
  app.post('/api/coach/newuser/:id', user.updateCoach);
//  app.post('/api/user/surveyTemplate/add/:id', user.addSurvey);
  app.get('/api/user/selectedAssignment/:id', user.getUser);
  app.post('/api/user/updateMedium/:id', user.updateMedium);
  app.post('/api/user/updateSlackId/:id', user.updateSlackId);
  app.get('/api/user/slackId/:id', user.bySlackId)
  app.post('/api/user/parse-csv', user.parseCSV);
  app.get('/api/user/unsub/:id', user.unsub);
  app.get('/api/user/sub/:id', user.sub);


};
