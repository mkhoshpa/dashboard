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

var io = require('socket.io')(config.messageSocketPort);

winston.info('listening for websocket connections on *:' + config.messageSocketPort);

// a list of currently connected sockets
var sockets = [];

io.on('connection', function (socket) {
  winston.info('A user connected');
  sockets.push(socket);
  socket.on('disconnect', function () {
    winston.info('User disconnected');
    sockets = _.without(sockets, socket);
  });
});

exports.sendSMS = function (req, res) {
  var message = new Message(req.body);
  winston.info('Begin sendSMS');

  message.save(function(err, message) {
    if (!err) {
      winston.info("Message saved.");
      winston.info('Message is: ' + JSON.stringify(message));
      User.findByIdAndUpdate(
        message.sentTo,
        {$push: {"messages": message}},
        {safe: true},
        function(err, user) {
          if (err) {
            winston.info("ERROR!!!!!!");
            winston.info(err);
          } else {
            winston.info('Message pushed to user');
            winston.info('User is ' + JSON.stringify(user));
            var sentToPhoneNumber = '';
            User.findById(message.sentTo, function (err, userSentTo) {
              if (!err) {
                twilio.sendMessage({
                  to: userSentTo.phoneNumber,
                  from: config.phoneNumbers.messages,
                  body: message.body
                }, function (err, responseData) {
                  if (!err) {
                    winston.info(JSON.stringify(responseData));
                  }
                });
              }
            });
          }
        }
      )
      winston.info(message);
      res.send(message);
    }
  });
}

exports.receiveSMS = function (req, res) {
  winston.info('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  winston.info('Received SMS from: ' + req.body.From);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  winston.info("The client wrote: " + req.body.Body);
  winston.info('req.body.From is: ' + req.body.From);
  // Find user by phone num and actually create valid message object
  User.findOne({phoneNumber: req.body.From}, function (err, user) {
    winston.info('User is: ' + JSON.stringify(user));
    winston.info('We should be adding a message');
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
          winston.info('The user with that phone number is: ' + user.slack.name);
          io.emit('message', message);
          winston.info('Message saved and pushed to user');
        }
      });
    });
    res.end(resp.toString());
};
