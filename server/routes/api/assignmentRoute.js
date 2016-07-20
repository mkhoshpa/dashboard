'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.post('/api/assignment/create', assignment.create);
  app.get('/api/assignment/list', assignment.list);
  //app.post('/api/assignment/removeByReminderId', assignment.removeByReminderId);
  //ok we got the basic call working, now let's get only the surveys and remidners that are for right now
  //app.get('/api/assigment/selectedSurvey/:id', assignment.selectedlist);
  app.get('/api/assignment/convosNow', assignment.convosNow);

};
