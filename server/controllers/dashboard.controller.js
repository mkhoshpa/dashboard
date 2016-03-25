'use strict'

var User 		 = require('mongoose').model('User'),
    path     = require('path'),
		passport = require('passport');

exports.render = function(req, res, next) {
  if (req.user) {
    // Use the 'response' object to render the signin page
    res.render(path.resolve('app/index'), {
      user: JSON.stringify(req.user)
    });
  } else {
    //req.session.returnTo = req.path;
		return res.redirect('/signin');
	}
}
