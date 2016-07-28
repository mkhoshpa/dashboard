'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.post('/api/assignment/create', assignment.create);
  app.get('/api/assignment/list', assignment.list);
  app.post('/api/assignment/reminderId/remove/:id', assignment.removeByReminderId);
  app.post('/api/assignment/reminder/update/:id', assignment.updateByReminderId);

  //ok we got the basic call working, now let's get only the surveys and remidners that are for right now
  app.get('/api/assignment/selectedSurvey/:id', assignment.selectedlist);
  app.get('/api/assignment/convosNow', assignment.convosNow);

  app.get('/api/assignment/selectedUser/:id', assignment.selectedByUserId);
  app.get('/api/assignment/reminder/selectedUser/:id', assignment.reminderSelectedByUserId);

};
