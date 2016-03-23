'use strict';

// Load the module dependencies
var client = require('../controllers/api/client.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/api/client', client.create);

  app.get('/api/clients')
}
