// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
  SlackStrategy = require('passport-slack').OAuth2Strategy,
  config = require('../config'),

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
