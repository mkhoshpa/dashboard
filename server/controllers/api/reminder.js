'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var User = require('../../models/user.js');
var moment = require('moment');


exports.create = function(req, res) {
  console.log(req.body);
  var reminder = new Reminder(req.body);
  reminder.save(function(err, reminder) {
    if(!err) {
      res.send(reminder);
      console.log(reminder);
      User.findByIdAndUpdate(
        reminder.assignee,
        {$push: {"reminders": reminder._id}},
        {safe: true},
        function(err, reminder) {
          if(err) {
            console.log(err);
          }
          else {
            console.log(reminder);
          }
        }
      );
      User.populate(
        reminder.assignee,
        {path: 'reminders'}, function(err, reminder) {

        }
      );
    }
  });
}
//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.listNow = function(req,res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}
exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

// Push new reminder onto user
exports.push = function(req, res) {

}

//need a method to find all the reminders that need to go out
