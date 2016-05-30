// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://shane:letmein1@localhost:27017/development',
	sessionSecret: 'developmentSessionSecret',
  phoneNumbers: {
    messages: '+12898062194',
    reminders: '+12044005478'
  },
	facebook: {
		clientID: '237058900007908',
		clientSecret: '756eb97b58fb72f845277f0e2f51fda2',
		callbackURL: 'http://localhost:8081/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:8081/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:8081/oauth/google/callback'
	}
};
