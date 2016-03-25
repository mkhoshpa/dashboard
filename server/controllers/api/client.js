'use strict'

var mongoose = require('mongoose');
var User = require('../../models/user.js');


exports.insert = function(req, res) {
  // User.findByIdAndUpdate(
  //   req.params.id,
  //   {$push: {"client"}}
  // );

  console.log(req.user);
}

exports.read = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  note.find({}, function(err, obj) {
    res.json(obj);
  })
}
