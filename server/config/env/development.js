// Invoke 'strict' JavaScript mode
'use strict';

// Server ip and port are in this object so they can be referred to in the configuration object
var server = {
  ip: 'localhost',
  port: '12557'
};

// Set the 'development' environment configuration object
module.exports = {
  server: server,
  messageSocketPort: 45874,
  db: 'mongodb://shane:letmein1@localhost:27017/development',
  sessionSecret: 'developmentSessionSecret',
  phoneNumbers: {
    messages: '+12898062194',
    reminders: '+12044005478'
  },
  mandrillApiKey: 'g0tWnJ18NBP7EFHirXvGUQ',
	facebook: {
		clientID: '237058900007908',
		clientSecret: '756eb97b58fb72f845277f0e2f51fda2',
		callbackURL: 'http://' + server.ip + ':' + server.port + '/oauth/facebook/callback'
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
