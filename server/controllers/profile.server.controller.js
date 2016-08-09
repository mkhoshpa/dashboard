var User = require('../models/user.js');

exports.render = function (req, res) {
  console.log('Rendering profile');

  User.findById(req.params.id, function (err, user) {
    res.render('pages/profile.ejs', {
      profileOptions: user.profileOptions
    });
  });
};
