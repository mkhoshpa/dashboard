'use strict';

// Load the module dependencies
var surveyTemplete = require('../../controllers/api/surveyTempleteController.js');


// Define the routes module' method
module.exports = function(app) {
  app.post('/api/surveyTemplete/create', surveyTemplete.create);

}
