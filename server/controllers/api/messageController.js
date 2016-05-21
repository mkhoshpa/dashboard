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

  message.save(function(err, message) {
    if (!err) {
      console.log("Message saved.");
      User.findByIdAndUpdate(
        message.sentTo,
        {$push: {"messages": message._id}},
        {safe: true},
        function(err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log('Message pushed to user');
            console.log(user);
            var sentToPhoneNumber = '';
            User.findById(message.sentTo, function (err, userSentTo) {
              if (!err) {
                twilio.sendMessage({
                  to: userSentTo.phoneNumber,
                  from: '+12898062194',
                  body: message.body
                }, function (err, responseData) {
                  if (!err) {
                    console.log(JSON.stringify(responseData));
                    //`console.log('Message successfully sent to: ' + userSentTo.phoneNumber);
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

exports.sendFB = function (req, res) {
  if (req.query['hub.verify_token'] === '4kfz2v98hj1CCG2ho01C1s1Pup5TEh2JuBOVXDnh') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
}
