'use strict'
var mongoose = require('mongoose');
var SurveyTemplate = require('../../models/surveyTemplate.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var request = require('request');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');
var config = require('../../config/env/development.js');
var schedule = require('node-schedule');

exports.create = function(req, res) {

  var surveyTemplate = new SurveyTemplate(req.body);
  console.log();
  console.log('Printing survey template');
  console.log(surveyTemplate);
  //console.log(surveyTemplate.questions);
  surveyTemplate.save(function(err, surveyTemplate) {
    if(!err) {
      User.findByIdAndUpdate(
        surveyTemplate.author,
        {$push: {"surveyTemplates": surveyTemplate}},
        {safe: true, new: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
            console.log();
            console.log('Printing user...');
            console.log(user);
          }
        }
      );
    }
  });
  res.send(surveyTemplate);
}

exports.preview = function (req, res) {
  console.log();
  console.log('Inside preview');
  var surveyTemplate = new SurveyTemplate(req.body);
  User.findById(surveyTemplate.author, function (err, user) {
    console.log(user.phoneNumber);
    twilio.sendMessage({
      to: user.phoneNumber,
      from: config.phoneNumbers.reminders,
      body: 'Hi! Here\'s a survey your coach wanted me to send.'
    }, function (err, responseData) {
      if (!err) {
        console.log(JSON.stringify(responseData));
        // TODO: possibly replace with _.find()
        var index = 0;
        for (var key in surveyTemplate.questions) {
          console.log('The key is: ' + key);
          console.log(surveyTemplate.questions[key]);
          console.log('Sending question: ' + JSON.stringify(surveyTemplate.questions[key].question));
          twilio.sendMessage({
            to: user.phoneNumber,
            from: config.phoneNumbers.reminders,
            body: surveyTemplate.questions[key].question
          }, function (err, responseData) {
            if (!err) {
              console.log(JSON.stringify(responseData));
            }
          });
          index++;
        }
      }
    });
  });
  console.log(surveyTemplate);
  res.send(surveyTemplate);
}

exports.schedule = function (req, res) {
  console.log('Scheduling survey');
  console.log(req.body);
  res.send(req.body);
}

exports.sendSurveys = function () {
  console.log('Sending surveys...');
}

// Every minute all day every day
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
var job = schedule.scheduleJob(rule, function() {
  exports.sendSurveys();
});
