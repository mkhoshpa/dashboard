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
          if(err) {
            // Do something
          }
          else {
            // Do Nothing?
          }
        }
      );
    }
  });
}
//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

exports.update = function(req, res) {
  console.log(req.params);
  Reminder.findByIdAndUpdate(
    req.params.id,
    {$set: {
      title: req.body.title,
      timeOfDay: req.body.timeOfDay,
      selectedDates: req.body.selectedDates,
      daysOfTheWeek: req.body.daysOfTheWeek,
      assignee: req.body.assignee
    }},{new: true}, function(err, reminder) {
      if(reminder) {
        // It updates but sends back old reminder?
        res.send(reminder);
      }
      else{

      }
    }
  );
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

//need a method to find all the reminders that need to go out
