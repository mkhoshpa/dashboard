'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var ReminderResponse = require('../../models/reminderResponse.js');
var User = require('../../models/user.js');
var Message = require('../../models/message.js');
var messageController = require('./messageController.js');
var moment = require('moment');
var _ = require('underscore');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var schedule = require('node-schedule');

var Promise = require('bluebird');
var request = require('request');
var config = require('../../config/env/development.js');

http.listen(3852, function () {
  console.log('listening for websocket connections on *:3852');
});

// a list of currently connected sockets
var sockets = [];

io.on('connection', function (socket) {
  console.log('A user connected');
  sockets.push(socket);
  socket.on('disconnect', function () {
    console.log('User disconnected');
    sockets = _.without(sockets, sockets);
  });
});

exports.create = function(req, res) {
  var reminder = new Reminder(req.body);
  console.log("reminder controller hit");
  console.log(reminder);
  reminder.save(function(err, reminder) {
    if(!err) {
      User.findByIdAndUpdate(
        reminder.assignee,
        {$push: {"reminders": reminder}},
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

      /*

      twilio.sendMessage({
        to: '+15064261732',
        from: '+12898062194',
        body: reminder.title
      }, function (err, responseData) {
        if (!err) {
          console.log(responseData.from);
          console.log(responseData.body);
        }
      });*/

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
  console.log('Updating reminder');
  console.log();
  console.log(req.body);
  Reminder.findOneAndUpdate({'_id': req.body._id},
  {
    title: req.body.title,
    timeOfDay: req.body.timeOfDay,
    days: req.body.days,
    hour: req.body.hour,
    minute: req.body.minute,
    seletedDates: req.body.selectedDates,
    daysOfTheWeek: req.body.daysOfTheWeek,
    author: req.body.author,
    assignee: req.body.assignee,
    responses: []
  }, {new: true}, function (err, reminder) {
    if (!err) {
      console.log('Reminder updated: ' + reminder);
    }
  })
  User.findById(req.body.assignee, function (err, user) {
    if (err) {
      console.log(err);
    }

    var _user = user;
    var user = user.toObject();

    console.log('The user is: ' + JSON.stringify(user));
    console.log('The user\'s id is: ' + user._id);
    console.log('User.reminders is: ' + JSON.stringify(user.reminders));
    for (var i = 0; i < user.reminders.length; i++) {
      if (user.reminders[i]._id == req.body._id) {
        console.log(JSON.stringify(user.reminders[i]));
        user.reminders[i] = req.body;
        console.log(JSON.stringify(user.reminders[i]));
        res.send(req.body);
      }
    }
    _user.set(user);
    _user.save(function (err, doc) {
      console.log(JSON.stringify(doc));
    });
  });
  /*User.findByIdAndUpdate(
    req.body.assignee,
    function (err, user) {
    console.log(JSON.stringify(user));
    for (var i = 0; i < user.reminders.length; i++) {
      if (user.reminders[i]._id == req.body._id) {
        user.reminders[i] = req.body;
      }
    }
    console.log(JSON.stringify(user));
  });*/
  //res.send(req.body);
}

exports.delete = function(req, res) {
  console.log('Inside reminder.delete');
  console.log('id: ' + req.params.id);
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, reminder) {
      if(reminder) {
        console.log(reminder);
        User.findByIdAndUpdate(reminder.assignee,
          {$pull : {'reminders': reminder}},
          function(err, model) {
            console.log(model);
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

exports.receiveResponse = function (req, res) {
  console.log('Begin receiveResponse');
  var resp = new twiml.TwimlResponse();
  console.log('Received SMS from: ' + req.body.From);
  res.writeHead( 200, {
    'Content-Type': 'text/xml'
  });
  console.log('The client wrote: ' + req.body.Body);
  console.log('req.body.From is: ' + req.body.From);
  User.findOne({phoneNumber: req.body.From}, function (err, _user) {
    var user = _user.toObject();
    console.log('User is: ' + JSON.stringify(_user));
    Reminder.findById(user.reminders[user.reminders.length - 1], function (err, _reminder) {
      var reminder = _reminder.toObject();
      if (reminder && reminder.needsResponse) {
        reminder.needsResponse = false;
        reminder.responses.push({
          response: req.body.Body,
          createdBy: user._id
        });
        _reminder.set(reminder);
        _reminder.save();
        user.reminders[user.reminders.length - 1].responses.push(_reminder);
        _user.set(user);
        _user.save();
        io.emit('response', reminder);
      }
    });
  });
  res.end(resp.toString());
}

exports.sendReminders = function () {
  var now = new Date();
  var hoursNow = now.getHours();
  var minutesNow = now.getMinutes();
  var dayNow = now.getDay();

  console.log("Running sendReminders");
  console.log("Time is: " + now);

  Reminder.find({days: dayNow})
      .where('hour').equals(hoursNow)
      .where('minute').equals(minutesNow)
      .populate('assignee')
      .populate('slack')
      .exec(function (err, docs) {
        console.log('Printing all reminders for this time.');
        console.
        log(docs);
        console.log(docs.length);
        // Turns out 'int' isn't in JS... I blame C++ for ruining me
        for (var i = 0; i < docs.length; i++) {
          docs[i].needsResponse = true;
          console.log(docs[i].assignee.phoneNumber);
          var phoneNum = docs[i].assignee.phoneNumber;
          var title = docs[i].title;
          docs[i].save();
          console.log(docs[i]);
          User.findById(docs[i].author, function (err, author) {
            if (!err) {
              console.log('sending message');
              twilio.sendMessage({
                to: phoneNum,
                from: config.phoneNumbers.reminders,
                body: title
              }, function (err, responseData) {
                if (!err) {
                  console.log(JSON.stringify(responseData));
                }
              });
            }
          });
        }
      });
}

// Every minute all day every day
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
var job = schedule.scheduleJob(rule, function() {
    exports.sendReminders();
});

//need a method to find all the reminders that need to go out
