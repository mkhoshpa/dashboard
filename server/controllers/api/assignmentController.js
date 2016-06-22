'use strict'

var mongoose = require('mongoose');
var User = require('../../models/user.js'),
Assignment = require('../../models/assignment.js');
var Survey  = require('../../models/assignment.js');
///create a assignment.js or change as assignment for right now is only a string.

//not used
exports.create = function(req, res) {
  var assignment = new assignment(req.body);
  console.log("assignment controller");
  console.log(assignment);
  assignment.save(function(err, assignment){
    // if(!err){
    //   User.findByIdAndUpate(
    //     assignment.assignee,
    //     {$push: {"assignment":
    //     }}
    //   )
    // }
  })
  res.send({});

}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {

}
