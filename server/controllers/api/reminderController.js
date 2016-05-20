'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var ReminderResponse = require('../../models/reminderResponse.js');
var User = require('../../models/user.js');
var moment = require('moment');
var _ = require('underscore');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var smsresponse = require('twilio');
var smsReceiver = require('express')();

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

      twilio.sendMessage({
        to: '+15064261732',
        from: '+12898062194',
        body: reminder.title
      }, function (err, responseData) {
        if (!err) {
          console.log(responseData.from);
          console.log(responseData.body);
        }
      });

      res.send(reminder);
    }
  });
}

exports.receiveSMS = function (req, res) {
  console.log('Inside receiveSMS');
  var resp = new smsresponse.TwimlResponse();
  resp.message('You replied: ' + req.body.Body);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client responded with: " + req.body.Body);
  console.log(JSON.stringify(req.body));
  /*Reminder.findByIdAndUpdate(
    req.body.
  )*/
  res.end(resp.toString());
}
//fire a console log statement if we recieve a response


//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

//TODO change routes so this method gets called
exports.addResponse = function(req, res) {
  console.log(req.body);
  console.log('add response triggerd');
  var reminder;

  Reminder.findByIdAndUpdate(
    req.params.id ,
    {
      $push: {
        "responses": {
          timeStamp: Date.now(),
          completed: true,
          text: req.body.text
        }
      }
    },
    {safe: true, upsert: true, new : true},
        function(err, model) {
          console.log("reminder updated");
            console.log(err);
            console.log(model);
            reminder = model;

        }
      );
  User.findById(reminder.assignee ,
    function(err, user) {
      if(!err) {
        //edit the user
        console.log("user was reached" + user);
        user.mostRecentResponse = "Worked";
        user.save;
      }
    }
  );


  res.send(model);
}







  // var status = "green";
  // if(req.body.completed)

  // User.findByIdAndUpdate(
  //   req.params.id ,
  //   {
  //     $set: {
  //       "mostRecentResponse": {
  //
  //         text: req.body.text
  //       }
  //     }
  //
  //   },
  //   {safe: true, upsert: true, new : true},
  //       function(err, model) {
  //           console.log(err);
  //           res.send(model);
  //
  //       }
  //     )
  //
  //
  // }


  //TODO make a virtual to easily display the text and bool from the last responses








//from http://stackoverflow.com/questions/15621970/pushing-object-into-array-schema-in-mongoose


exports.update = function(req, res) {
  Reminder.findByIdAndUpdate(
    req.params.id,
    {$set: {
      title: req.body.title,
      timeOfDay: req.body.timeOfDay,
      selectedDates: req.body.selectedDates,
      daysOfTheWeek: req.body.daysOfTheWeek,
      assignee: req.body.assignee,
      hour: req.body.hour,
      minute: req.body.minute,
      days: req.body.days


    }},{new: true}, function(err, reminder) {
      if(reminder) {
        console.log(JSON.stringify(reminder));
        res.send(reminder);
      }
      else{
        res.sendStatus(500);
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
            res.json(docs);
          }
          else
            console.log(err);
        });
}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminders that need to go out
