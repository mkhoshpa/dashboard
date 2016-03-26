'use strict';

// Load the module dependencies
var slack = require('../../controllers/api/slack.js');


// Define the routes module' method
module.exports = function(app) {

  app.post('/api/slack/:id', slack.insert);
  app.get('/api/slack',slack.list);
  app.delete('/api/slack/:id',slack.delete);
  app.get('/api/slack/:id',slack.read);

}
