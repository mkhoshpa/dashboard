'use strict';

// Load the module dependencies
var client = require('../../controllers/api/client.js');


// Define the routes module' method
module.exports = function(app) {

  app.post('/api/client:id', client.insert);
  app.get('/api/clients',client.list);
  app.delete('/api/client:id',client.delete);
  app.get('/api/client:id',client.read);

}
