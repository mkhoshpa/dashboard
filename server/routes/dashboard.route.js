'use strict';

// Load the module dependencies
var dashboard    = require('../controllers/dashboard.controller'),
	  passport = require('passport');

// Define the routes module' method
module.exports = function(app) {
  app.get('/dashboard', dashboard.render);
};
