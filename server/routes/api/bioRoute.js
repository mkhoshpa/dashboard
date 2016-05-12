'use strict';

// Load the module dependencies
var bio = require('../../controllers/api/bioController.js');

// Define the routes module' method
module.exports = function(app) {

  app.post('/api/bio', bio.create);

}
