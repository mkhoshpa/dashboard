var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

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
