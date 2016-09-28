// Invoke 'strict' JavaScript mode
'use strict';

// Server ip and port are in this object so they can be referred to in the configuration object
var server = {
  ip: 'cxjcbvzj.cname.us.ngrok.io',
  port: '12557'
};

// Set the 'development' environment configuration object
module.exports = {
  // If I push this code to dev and the db is still localhost I owe Josh + Thom $5 each - Shane
	//db: 'mongodb://thom:letmein1@ds011251.mlab.com:11251/fitpath',
	//db: 'mongodb://josh:letmein1@ds011765.mlab.com:11765/awesomebox',
  // db: 'mongodb://shane:letmein1@localhost:27017/development',
	//db: 'mongodb://chuck:letmein1@ds015194.mlab.com:15194/production',
	//db: 'mongodb://someguy:letmein1@ds011735.mlab.com:11735/thomlocal',
	//db:'mongodb://mehrgan:letmein1@ds037956-a0.mlab.com:37956,ds037956-a1.mlab.com:37956/prod?replicaSet=rs-ds037956',

	db: 'mongodb://thomprod:rZrwcJkzar92@ds157955-a0.mlab.com:57955,ds157955-a1.mlab.com:57955/prod?replicaSet=rs-ds157955',
  server: server,
  messageSocketPort: 45874,
  sessionSecret: 'developmentSessionSecret',
  phoneNumbers: {
    messages: '+12045002320',
		//real 12044005478
    reminders: '+12045002562'
  },
  mandrillApiKey: 'g0tWnJ18NBP7EFHirXvGUQ',
	facebook: {
		clientID: '263454760701655',
		clientSecret: '66bee4e67a7732e0a36ef69bfddbeeec',
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
