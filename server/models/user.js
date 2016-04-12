
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
  	crypto = require('crypto'),
  	Schema = mongoose.Schema,
    Slack = require('./slack.js'),
    reminder = require('./reminder.js');

// Define a new 'UserSchema'
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	// email: {
	// 	type: String,
	// 	// Validate the email format
  //   index: true,
  //   unique: true,
	// 	match: [/.+\@.+\..+/, "Please fill a valid email address"]
	// },
  // Username is the unique itendifier,
	username: {
		type: String,
		// Set a unique 'username' index
		unique: true,
    index: true,
		// Validate 'username' value existance
		required: 'Email is required',
		// Trim the 'username' field
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			function(password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
  slack_id : {type: String},
  slack : {
    email: {type: String},
    id: {type: String},
    img: {type: String},
    name: {type: String},
    real_name: {type: String},
    team: {type: String},
    timezone: {type: String}
  },
  reminders: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'}
  ],
  surveys: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Survey'}
  ],
  image: {
    type: String,
  },
  role:{
    type: String,
    enum: ['coach', 'user', 'admin'],
    default: 'user'
  },
  clients: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      // slack :{ type: mongoose.Schema.Types.ObjectId, ref: 'Slack' },
      // reminders: [
      //   {
      //     title: {type: String},
      //     response: {type: String},
      //     time: {type: String},
      //     daysOfWeek: {
      //       monday: {type: Boolean},
      //       tuesday: {type: Boolean},
      //       wednesday: {type: Boolean},
      //       thursday: {type: Boolean},
      //       friday: {type: Boolean},
      //       saturday: {type: Boolean},
      //       sunday: {type: Boolean}
      //     },
      //     active:{type: Boolean}
      //   }
      // ]
  ],
  coaches: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  clients: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
	salt: {
		type: String
	},
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
	provider: {
		type: String,
		// Validate 'provider' value existance
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
  else {
    this.password = this.generatePassword();
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
    //popping the slack id up a level so it's easy to get 
    this.slack_id = this.slack.id;

	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.methods.generatePassword = function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

UserSchema.methods.isUnique = function (email) {
  this.findOne({
    username: email
  }, function(err, user) {
    if(!user) {
      return true;
    }
    else {
      return false;
    }
  })
}


// Find possible not used username
// UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
// 	var _this = this;
//
// 	// Add a 'username' suffix
// 	var possibleUsername = username + (suffix || '');
//
// 	// Use the 'User' model 'findOne' method to find an available unique username
// 	_this.findOne({
// 		username: possibleUsername
// 	}, function(err, user) {
// 		// If an error occurs call the callback with a null value, otherwise find find an available unique username
// 		if (!err) {
// 			// If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
// 			if (!user) {
// 				callback(possibleUsername);
// 			} else {
// 				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
var User = mongoose.model('User', UserSchema);

module.exports = User;
