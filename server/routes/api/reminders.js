'use strict';

// Load the module dependencies
var reminder = require('../../controllers/api/reminder.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/willow/reminder', reminder.create);
  app.get('/willow/reminder', reminder.list);
  app.get('/willow/reminder/now', reminder.listNow);

//  app.get('/willow/reminder/now', reminder.now);
}
