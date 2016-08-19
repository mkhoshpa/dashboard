'use strict';

var Message = require('../../models/message.js');
var User = require('../../models/user.js');
var Reminder = require('../../models/reminder.js');
var _ = require('underscore');
var config = require('../../config/env/development.js');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');
var config = require('../../config/env/development.js');
var winston = require('winston');

var io = require('socket.io')(28104);

console.log('listening for websocket connections on *:' + config.messageSocketPort);

// a list of currently connected sockets
var sockets = [];

io.on('connection', function (socket) {
  console.log('A user connected');
  sockets.push(socket);
  socket.on('disconnect', function () {
    console.log('User disconnected');
    sockets = _.without(sockets, socket);
  });
});

exports.sendSMS = function (req, res) {
  var message = new Message(req.body);
  console.log('Begin sendSMS');

  message.save(function(err, message) {
    if (!err) {
      console.log("Message saved.");
      console.log('Message is: ' + JSON.stringify(message));
      User.findByIdAndUpdate(
        message.sentTo,
        {$push: {"messages": message}},
        {safe: true},
        function(err, user) {
          if (err) {
            console.log("ERROR!!!!!!");
            console.log(err);
          } else {
            console.log('Message pushed to user');
            console.log('User is ' + JSON.stringify(user));
            var sentToPhoneNumber = '';
            User.findById(message.sentTo, function (err, userSentTo) {
              if (!err) {
                twilio.sendMessage({
                  to: userSentTo.phoneNumber,
                  from: config.phoneNumbers.messages,
                  body: message.body
                }, function (err, responseData) {
                  if (!err) {
                    console.log(JSON.stringify(responseData));
                  }
                });
              }
            });
          }
        }
      )
      res.send(message);
    }
  });
}

exports.receiveSMS = function (req, res) {
  console.log('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  console.log('Received SMS from: ' + req.body.From);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client wrote: " + req.body.Body);
  console.log('req.body.From is: ' + req.body.From);
  // Find user by phone num and actually create valid message object
  User.findOne({phoneNumber: req.body.From}, function (err, user) {
    console.log('User is: ' + JSON.stringify(user));
    console.log('We should be adding a message');
    var message = new Message({
      body: req.body.Body,
      sentBy: user._id,
      sentTo: '5741ef7c5254295828d8c3b0'
    });
    User.findOneAndUpdate(
      {phoneNumber: req.body.From},
      {$push: {messages: message}},
      {safe: true},
      function (err, user) {
        if (!err) {
          console.log('The user with that phone number is: ' + user.slack.name);
          io.emit('message', message);
          console.log('Message saved and pushed to user');
        }
      });
    });
    res.end(resp.toString());
};

exports.list = function(req, res){
  console.log("list");

  Message.find({})
      .populate('sentTo')
      .populate('sentBy')
      .exec(function(err, obj){
        if(err){
          console.log(err);
        }
        else {
          res.json(obj);
        }



      })

  // Message.find({}, function(err, obj){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     res.json(obj)
  //   }
  // })


}
