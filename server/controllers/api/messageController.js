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
  console.log('Received SMS from: ' + req.body.From);
  //resp.message('You wrote: ' + req.body.Body);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client wrote: " + req.body.Body);
  var message = new Message({
    body: req.body.Body,
    sentBy: req.body.From,
    sentTo: '5740520e1a24306816892905'
  });
  User.findOneAndUpdate(
    {phoneNumber: req.body.From},
    {$push: {messages: message}},
    {safe: true},
    function (err, user) {
      if (!err) {
        console.log('The user with that phone number is: ' + user.slack.name);
        console.log('Message saved and pushed to user');
    }
  });
  /*User.findByPhoneNumber(req.body.From, function (err, user) {
    if (!err) {
      console.log("The user with that phone number is: " + user.slack.name);
      message.save(function (err, message) {
        console.log('Message saved');
        if (!err) {
          User.findByIdAndUpdate(
            message.sentBy,
            {$push: {"messages": message}},
            {safe: true},
            function (err, user) {
              if (err) {
                console.log(err);
              } else {
                console.log('Message saved and pushed to user, at least theoretically.');
              }
            }
          )
        }
      });
    }
  });*/
  //console.log(JSON.stringify(req.body));
  res.end(resp.toString());
}

exports.sendFB = function (req, res) {
  if (req.query['hub.verify_token'] === '4kfz2v98hj1CCG2ho01C1s1Pup5TEh2JuBOVXDnh') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
}
