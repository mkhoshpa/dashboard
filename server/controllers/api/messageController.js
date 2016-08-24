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
      User.findById(message.sentTo, function (err, userSentTo) {
        twilio.sendMessage({
          to: userSentTo.phoneNumber,
          from: config.phoneNumbers.messages,
          body: message.body
        }, function (err, responseData) {
          if (!err) {
            console.log(JSON.stringify(responseData));
          }
        });
      });
      res.send(message);
    }
  });
};

exports.receiveSMS = function (req, res) {
  console.log('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  console.log('Received SMS from: ' + req.body.From);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client wrote: " + req.body.Body);

  // Search for the user's id based on their phone number
  User.findByPhoneNumber(req.body.From, function (err, user) {
    var message = new Message({
      body: req.body.Body,
      sentBy: user._id,
      sentTo: user.coaches[0]
    });
    message.save(function (err, message) {
      console.log('Saved message: ' + JSON.stringify(message));
    });
    io.emit('message', message);
  })
  res.end(resp.toString());
};

exports.list = function (req, res) {
  Message.find(function (err, messages) {
    if (!err) {
      res.send(messages);
    } else {
      res.sendStatus(500);
    }
  });
};
