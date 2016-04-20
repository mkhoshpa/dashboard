'use strict';

// Load the module dependencies
var reminderResponse = require('../../controllers/api/reminderResponse.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/api/reminderResponse', reminderResponse.create);
  app.get('/api/reminderResponse', reminderResponse.list);
  app.post('/api/reminderResponse/:id', reminderResponse.update);
  app.post('/api/reminderResponse/remove/:id', reminderResponse.delete);

//  app.get('/willow/reminderResponse/now', reminderResponse.now);
}
