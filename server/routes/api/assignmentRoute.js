'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.post('/api/assignment/create', assignment.create);
  app.get('/api/assignment/list', assignment.list);
  app.post('/api/assignment/removeByReminderId', assignment.removeByReminderId);
  app.get('/api/assignment/selectedUser/list/:id', assignment.reminderlist);
  //ok we got the basic call working, now let's get only the surveys and remidners that are for right now
  app.get('/api/assignment/selectedSurvey/:id', assignment.selectedlist);
  app.get('/api/assignment/convosNow', assignment.convosNow);

};
