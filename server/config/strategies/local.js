var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User'),
    winston = require('winston');


var hardCodedUser = new User();
hardCodedUser._id = '57bf2b9deb3573bb022d0ba6';
hardCodedUser.salt = '111';
hardCodedUser.provider = 'local';
hardCodedUser.firstName = 'me';
hardCodedUser.lastName = 'guy';
hardCodedUser.username = 'thommygunz@gmail.com';
hardCodedUser.password = 'SN04Yn66jG+gfOnQNo2O0pxwQCtFVK1urEw5qvhJF4M+th2DwR44JsoFkSNHSjUIa1eTvUYFO88zpPAMbr/LJQ==';
hardCodedUser.created = 'Thu Aug 25 2016 14:32:13 GMT-0300 (ADT)';
hardCodedUser.clients = [];
hardCodedUser.role = 'coach';



module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    console.log('Attempting to authenticate user:');
    console.log(username);

    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }

      user = hardCodedUser;
      console.log(user);
      console.log('The user\'s password is:');
      console.log(user.password);
      console.log('And the password that was attempted was: ');
      console.log(password);
      console.log(user.hashPassword(password));

      if (!user.authenticate(password)) {
        console.log();
        console.log('Something is wrong with the user. The user is:');
        console.log(JSON.stringify(user));
        console.log('The user\'s password is:');
        console.log(user.password);
        console.log('And the password that was attempted was: ');
        console.log(user.hashPassword(password));
        console.log();
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      return done(null, user);
      });
  }));
};
