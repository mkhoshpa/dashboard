'use strict';

var assignment = require('../../controllers/api/assignmentController.js');

module.exports = function(app) {

  app.get('/api/assignment/list', assignment.list);
  app.get('/api/assignment/now', assignment.listNow);
  app.post('/api/assignment/create', assignment.create);
  app.post('/api/assignment/update/:id', assignment.update);
  app.post('/api/assignment/remove/:id', assignment.delete);

}
