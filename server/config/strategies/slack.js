// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
  url = require('url'),
  SlackStrategy = require('passport-slack').OAuth2Strategy,
  config = require('../config'),
  users = require('../../controllers/users.login.controller');

module.exports = function() {
    passport.use(new SlackStrategy({
        clientID: settings.clientID,
        clientSecret: app.settings.clientSecret,
        callbackURL: app.settings.callbackURL,
        scope: 'incoming-webhook users:read',
        extendedUserProfile: true
      }, function(req, accessToken, refreshToken, profile, done) {

      });
}
