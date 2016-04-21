'use strict';

// Load the module dependencies
var reminderResponse = require('../../controllers/api/reminderResponseController.js');
var reminder = require('../../controllers/api/reminderController.js');

//responses are dumb objects that are created inside of a reminder


//let's change these to start with a reminder object



// Define the routes module' method
module.exports = function(app) {
  app.post('/api/reminderResponse', reminderResponse.create);
  app.get('/api/reminderResponse', reminderResponse.list);
  app.post('/api/reminderResponse/:id', reminder.addResponse);
  app.post('/api/reminderResponse/remove/:id', reminderResponse.delete);

//  app.get('/willow/reminderResponse/now', reminderResponse.now);
}
