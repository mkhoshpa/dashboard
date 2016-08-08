// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
		express = require('express'),
    winston = require('winston'),
		morgan = require('morgan'),
		compress = require('compression'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		flash = require('connect-flash'),
		passport = require('passport'),
    timezone = require('jstimezonedetect');

// Define the Express configuration method
module.exports = function() {

  // Expose winston.transports.Loggly
  require('winston-loggly');

  // Options for winston
  var options = {
    token: '0727b13e-0dd9-4de5-b631-b51f4f6c4241',
    subdomain: 'fitpath',
    tags: ['Dashboard'],
    json: false
  };

  // Use Loggly transport
  winston.add(winston.transports.Loggly, options);

	// Create a new Express application instance
	var app = express();

  app.use(function (req, res, next) {
    res.header('X-Server-Timezone', timezone.determine().name());
    next();
  });

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

	//thom added this in to implement easy node authentincation setup
	app.use(cookieParser());

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
	require('../routes/index.server.routes.js')(app, passport);
	require('../routes/users.login.routes.js')(app, passport);
	require('../routes/dashboard.route.js')(app, passport);
	require('../routes/api/reminderRoute.js')(app, passport);
	require('../routes/user.info.routes.js')(app, passport);
	require('../routes/api/assignmentRoute.js')(app, passport);
  require('../routes/api/responseRoute.js')(app, passport);
	require('../routes/api/facebook.routes.js')(app, passport);
	require('../routes/api/userRoute.js')(app, passport);
	require('../routes/api/bioRoute.js')(app, passport);
	require('../routes/api/noteRoute.js')(app, passport);
	require('../routes/api/messageRoute.js')(app, passport);
	require('../routes/api/phoneRoute.js')(app, passport);
	require('../routes/api/surveyTemplateRoute.js')(app, passport);
	require('../routes/api/pipelineStageroute.js')(app, passport);

	// Configure static file serving
  app.use(express.static(__dirname + '/../../app'));
  app.use(express.static(__dirname + '/../views'));
	app.use(express.static(__dirname + '/../../app/dist/triangular'));
	console.log(__dirname);
	// Return the Express application instance
	return app;
};
