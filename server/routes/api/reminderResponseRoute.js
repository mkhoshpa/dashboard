'use strict';

var reminderResponse = require('../../controllers/api/reminderResponseController.js');

module.exports = function(app) {

  app.get('/api/reminder/response/list', reminderResponse.list);
  // When Reminder is initially sent out by the bot
  app.post('/api/reminder/response/create', reminderResponse.create);
  // When there is a genuine response
  app.post('/api/reminder/response/respond/:id', reminderResponse.respond);
  app.post('/api/reminder/response/remove/:id', reminderResponse.delete);

}
