'use strict'

var mongooose = require('mongoose');
var Message = require('../../models/message.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var request = require('request');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');

exports.sendSMS = function (req, res) {
  var message = new Message(req.body);
  console.log('Begin sendSMS');
  console.log(message);

  message.save(function(err, message) {
    if (!err) {
      console.log("Message saved.");
      User.findByIdAndUpdate(
        message.sentTo,
        {$push: {"messages": message}},
        {safe: true},
        function(err, user) {
          if (err) {
            console.log(err);
          } else {
            var sentToPhoneNumber = '';
            console.log('message.sentTo is ' + message.sentTo);
            User.findById(message.sentTo, function (err, userSentTo) {
              if (!err) {
                twilio.sendMessage({
                  to: userSentTo.phoneNumber,
                  from: '+12898062194',
                  body: message.body
                }, function (err, responseData) {
                  if (!err) {
                    console.log('Message successfully sent to: ' + userSentTo.phoneNumber);
                  }
                });
              }
            });
          }
        }
      )
      console.log(message);
      res.send(message);
    }
  });
}

exports.receiveSMS = function (req, res) {
  console.log('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  resp.message('You replied: ' + req.body.Body);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client responsed with: " + req.body.Body);
  console.log(JSON.stringify(req.body));
  res.end(resp.toString());
}
