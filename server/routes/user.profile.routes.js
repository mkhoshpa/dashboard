'use strict';

// Load the module dependencies
var profile = require('../controllers/user.profile.controller.js');

// Define the routes module' method
module.exports = function(app) {
  app.get('/profile', profile.render);
}
