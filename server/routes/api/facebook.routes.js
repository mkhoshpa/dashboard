'use strict'
var facebook = require('../../controllers/api/facebook.controller.js');

module.exports = function(app) {
  app.post('/api/facebook', facebook.webhook);
}
