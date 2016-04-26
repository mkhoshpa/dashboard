'use strict'

var oauth = require('../../controllers/auth.controller.js');

module.exports = function(app) {
  app.get('/oauth/facebook/callback', oauth.facebook);
  app.get('/oauth/twitter/callback', oauth.twitter);
  app.get('/oauth/gmail/callback', oauth.google);
  app.get('/oauth/gmail/callback', oauth.slack);
}
