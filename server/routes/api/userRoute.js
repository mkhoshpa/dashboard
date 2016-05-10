'use strict';

// Load the module dependencies
var user = require('../../controllers/user.info.controller.js');

// Define the routes module' method
module.exports = function(app) {

  app.post('/api/user/create', user.create);
  app.post('/api/coach/newuser', user.updateCoach);


}
