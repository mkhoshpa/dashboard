// // Dependencies
// // -----------------------------------------------------
// var express         = require('express');
// var app             = express();
// var mongoose        = require('mongoose');
// var passport        = require('passport');
// var LocalStrategy   = require('passport-local').Strategy;
// var flash           = require('connect-flash');
//
// var morgan          = require('morgan');
// var cookieParser    = require('cookie-parser');
// var bodyParser      = require('body-parser');
// var session         = require('express-session');
// var methodOverride  = require('method-override');
//
// var db = 'mongodb://admin:admin@ds015919.mlab.com:15919/fitpath-dashboard'
// var port            = process.env.PORT || 3000;
//
// //routes
// var routes = require('./routes/index');
//
// // passport config
// var User = require('./models/user');
//
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());
//
// app.use(session({ resave: true,
//                   saveUninitialized: false,
//                   secret: 'fitpath'}));
//
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
//
// //app.use(express.static(__dirname + '/app'));
// app.use(express.static(__dirname + '/views'));
// console.log(__dirname);
// // app.get('/', function(req, res) {
// //   res.sendFile('index.html');
// // })
//
// app.use('/', routes);
//
// app.listen(3000);

// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./config/mongoose'),
		express  = require('./config/express'),
		passport = require('./config/passport');

// Create a new Mongoose connection instance
var db = mongoose();

console.log(db);
// Create a new Express application instance
var app = express();

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
