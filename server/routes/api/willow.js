'use strict';

// Define the routes module' method
module.exports = function(app) {
  var willow = require('../../controllers/api/willow');
  app.post('/willow', willow.create);
}
