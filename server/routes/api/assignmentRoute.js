'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.post('/api/assignment/create', assignment.create);
  app.get('/api/assignment/list', assignment.list);
  app.put('/api/assignments/completed/update/:id', assignment.completed);
  //app.post('/api/assignment/removeByReminderId', assignment.removeByReminderId);
  //ok we got the basic call working, now let's get only the surveys and remidners that are for right now
  app.get('/api/assignment/selectedSurvey/:id', assignment.selectedlist);
  app.get('/api/assignment/convosNow', assignment.convosNow);
  app.get('/api/assignment/selectedReminder/:id', assignment.selectedByReminder);
  //app.get('/api/assignment/reminder/selectedUser/list/:id', assignment.reminderSelectedByUserId);
  //app.get('/api/assignment/reminder/selectedUser/:id', assignment.reminderSelectedByUserId);
};
