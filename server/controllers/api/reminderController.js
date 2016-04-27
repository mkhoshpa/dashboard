'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var ReminderResponse = require('../../models/reminderResponse.js');
var User = require('../../models/user.js');
var moment = require('moment');
var _ = require('underscore');

var Promise = require('bluebird');
var request = require('request');

exports.create = function(req, res) {
  var reminder = new Reminder(req.body);
  console.log("reminder controller hit");
  console.log(reminder);
  reminder.save(function(err, reminder) {
    if(!err) {
      User.findByIdAndUpdate(
        reminder.assignee,
        {$push: {"reminders": reminder._id}},
        {safe: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
          }
        }
      );

      // User.populate(
      //   reminder.assignee,
      //   {path: 'reminders'}, function(err, user) {
      //     if(err) {
      //       // Do something
      //     }
      //     else {
      //     }
      //   }
      // );

      res.send(reminder);
    }
  });
}
//fire a console log statement if we recieve a response


//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

exports.update = function(req, res) {

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
        console.log(reminder);
        res.send(reminder);
      }
      else{

      }
    }
  );
}

exports.response = function(req, res) {
  console.log('attempted to add response to a reminder');
  var response = new ReminderResponse(req.body);
  response.save();

  Reminder.findOneAndUpdate(
    {_id: req.params.id},
    {
      $push: {"responses" : response}
    },
    {
      safe: true,
      new: true
    },
    function(err, doc) {
      if(doc) {
        res.send(doc);
      }
    }
  );
}


exports.delete = function(req, res) {
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, reminder) {
      if(reminder) {
        User.findByIdAndUpdate(reminder.assignee,
          {$pull : {'reminders': reminder._id}},
          function(err, model) {
          if(err) {
            // Do some flash message
          }
        });
        res.sendStatus(200);
      }
      else{
        res.sendStatus(500);
      }
    }
  );
}

exports.listNow = function(req,res) {

   var now = new Date();
   var hoursNow = now.getHours();
   var minutesNow = now.getMinutes();
   var dayNow = now.getDay();

   Reminder.find({days: dayNow})
        .where('hour').equals(hoursNow)
        .where('minute').equals(minutesNow)
        .populate('assignee')
        .populate('slack')
        .exec(function(err, docs){
          console.log(docs);
          console.log('exec reminder/now');
          if(docs){
            initResponses(docs)
              .then(function(reminders) {
                console.log('then-');
                res.json(reminders);
              })
              .catch(function(err) {
                console.log(err);
              });
          }
          else
            console.log(err);
        });
}

// Init Responses with empty text value
function initResponses(reminders) {
  return new Promise(function(resolve, reject) {
    var options = function(creator, id) {
      return {
        method: 'POST',
        uri: 'http://localhost:3000/api/reminder/response/' + id,
        form: {
          createdBy: creator,
          reminder: id
        }
      };
    }
    _.each(reminders, function(reminder, index) {
      request(options(reminder.author, reminder._id), function(err, res, body) {
        console.log(' in each');
        if(index == reminders.length - 1)
          resolve(reminders);
        else if (err)
          reject(err);
      });
    });
  });
}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminders that need to go out
