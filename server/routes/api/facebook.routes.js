'use strict';

var facebook = require('../../controllers/api/facebook.controller.js');

module.exports = function(app) {
	app.get('/api/facebook/getprofile/:user_id/:access_token', facebook.getProfile);
  app.post('/api/facebook/email/', facebook.sendEmail);
  app.get('/api/facebook/connect', facebook.connectUser);
  app.get('/api/facebook/getclientprofile', facebook.getClientProfile);
};
