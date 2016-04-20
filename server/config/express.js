// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
		express = require('express'),
		morgan = require('morgan'),
		compress = require('compression'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		flash = require('connect-flash'),
		passport = require('passport'),
		cloudinary = require('cloudinary'),
		nodemailer = require('nodemailer'),
		crypto = require('crypto'),
		client = require('twilio')('AC3408c09dc79f2d5c0bc09342ae5c0fde', '7c139025f034ae9e3e66854a0d3a152f'),
		async = require('async');


// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		// cookie: { maxAge: 60000 },
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './server/views');
	app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	app.use(flash());

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Load the routing files
	require('../routes/index.server.routes.js')(app);
	require('../routes/users.login.routes.js')(app);
	require('../routes/dashboard.route.js')(app);
	require('../routes/api/slack.js')(app);
	require('../routes/api/willow.js')(app);
	require('../routes/api/habits.js')(app);
	require('../routes/api/willow-survey.js')(app);
	require('../routes/api/reminders.js')(app);
	require('../routes/api/reminderResponse.js')(app);
	require('../routes/user.info.routes.js')(app);
	require('../routes/api/survey.js')(app);
	require('../routes/twilio.js')(app, client);
	require('../routes/triangular.routes.js')(app);
	require('../routes/api/facebook.routes.js')(app);

	// Configure static file serving
  app.use(express.static(__dirname + '/../../app'));
  app.use(express.static(__dirname + '/../views'));
	app.use(express.static(__dirname + '/../../app/dist/triangular'));
	console.log(__dirname);
	// Return the Express application instance
	return app;
};
