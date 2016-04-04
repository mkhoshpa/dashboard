'use strict';

// Load the module dependencies
var reminder = require('../../controllers/api/reminder.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/api/reminder', reminder.create);
  app.get('/api/reminder', reminder.list);
  app.get('/api/reminder/now', reminder.listNow);
  app.post('/api/reminder/:id', reminder.update);
  app.post('/api/reminder/remove/:id', reminder.delete);

//  app.get('/willow/reminder/now', reminder.now);
}
