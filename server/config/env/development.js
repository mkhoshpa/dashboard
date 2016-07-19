// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
//'mongodb://thom:letmein1@ds011251.mlab.com:11251/fitpath'
module.exports = {
  db: 'mongodb://shane:letmein1@localhost:27017/development',
  sessionSecret: 'developmentSessionSecret',
  phoneNumbers: {
    messages: '+12898062194',
    reminders: '+12044005478'
  },
	facebook: {
		clientID: '263814747332323',
		clientSecret: 'b8ba174ba9f1b916f6f59b06a745eb4d',
		callbackURL: 'http://localhost:12557/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://107.170.21.178:8081/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://107.170.21.178:8081/oauth/google/callback'
	}
};
