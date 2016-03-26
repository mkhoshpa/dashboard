'use strict'

// Create a connect between the coach/dashboard user and a slack user.

var mongoose = require('mongoose');

// These are listed as clients within the dashboard, of because how they're managed
var Slack = require('../../models/slack.js');
var User = require('../../models/user.js');

// Insert a slack connection into the current user's client object
exports.insert = function(req, res) {

  User.findByIdAndUpdate(
     req.user.id,
     {$push: {"clients": {user: req.params.id, slack: null}}},
     {safe: true, upsert: true, new : true},
     function(err, model) {
       console.log(err);
       console.log(model);
     }
  );

  console.log(req.user);
}

exports.read = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {

}
