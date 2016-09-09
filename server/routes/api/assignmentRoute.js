'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.post('/api/assignment/create', assignment.create);
  

  app.get('/api/assignment/list', assignment.list);
  app.put('/api/assignment/completed/update/:id', assignment.completed);
  app.put('/api/assignment/sent/update/:id', assignment.sent);
  //app.post('/api/assignment/removeByReminderId', assignment.removeByReminderId);
  //ok we got the basic call working, now let's get only the surveys and remidners that are for right now
  app.get('/api/assignment/selectedSurvey/:id', assignment.selectedlist);
  app.get('/api/assignment/convosNow', assignment.convosNow);
  app.get('/api/assignment/selectedReminder/:id', assignment.selectedByReminder);
  app.get('/api/assignment/survey/user/:id', assignment.selectedByUser);



  app.get('/api/assignment/path/selectedUser/list/:id', assignment.pathSelectedByUserId);
  //app.get('/api/assignment/reminder/selectedUser/:id', assignment.reminderSelectedByUserId);
};
