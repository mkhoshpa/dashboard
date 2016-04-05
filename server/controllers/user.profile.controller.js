'use strict'

var mongoose = require('mongoose');
var User = require('../models/user.js');


exports.render = function(req, res) {
  if (!req.user) {
		// Use the 'response' object to render the signup page
		res.render('pages/signin', {
			// Set the page title variable
			title: 'Sign-up Form',
			// Set the flash message variable
			messages: req.flash('You must be logged In!')
		});
	} else {
		res.render('pages/profile', {
      user: req.user,
      userFullName: req.user ? req.user.fullName : '',
      email: req.user ? req.user.username : '',
      messages: req.flash('success')
    });
	}
}

exports.update = function(req,res) {
  console.log(req.body);
  if(!req.user) {
    // Use the 'response' object to render the signup page
    res.render('pages/signin', {
      // Set the page title variable
      title: 'Sign-up Form',
      // Set the flash message variable
      messages: req.flash('You must be logged In!')
    });
  } else {
    // User.findByIdAndUpdate({
    //
    //
    // });
    res.redirect('/');
  }
}
