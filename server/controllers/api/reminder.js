'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var User = require('../../models/user.js');
var moment = require('moment');


exports.create = function(req, res) {
  console.log('create -req.body');
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
        res.send(reminder);
      }
      else{

      }
    }
  );
}

exports.delete = function(req, res) {
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, success) {
      if(success) {
        res.send('success');
      }
      else{

      }
    }
  );
}

exports.listNow = function(req,res) {
    console.log("testing how soon is now");
    //test virtuals 
   // var reminder = Reminder.makeDefaultReminder();
   // console.log("this is a reminder");
   // console.log(reminder.hour);
   // console.log(reminder.minute);
   // console.log(reminder.days);
    
    
   var now = new Date();
   console.log(now);
   var hoursNow = now.getHours();
   console.log("the hours now are" + hoursNow);
   var minutesNow = now.getMinutes();
   
  
   var dayNow = now.getDay();
   console.log(dayNow);
   console.log("the day now is " + dayNow);
   
   
   Reminder.find({days: dayNow})
        .where('hour').equals(hoursNow)
        .where('minute').equals(minutesNow)
        .exec(function(err, docs){
            console.log(err);  //returns Null
            console.log(docs); 
             //returns Null.
             
             res.json(docs);
    });

}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminders that need to go out
