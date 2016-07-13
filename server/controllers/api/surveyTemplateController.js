'use strict'
var SurveyTemplate = require('../../models/surveyTemplate.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var request = require('request');
var config = require('../../config/env/development.js');

exports.create = function(req, res) {
  console.log();
  console.log('CREATING SURVEY');
  console.log(req.body);
  console.log();

  var surveyTemplate = new SurveyTemplate(req.body);
  surveyTemplate.save(function(err, surveyTemplate) {
    if(!err) {
      console.log("this worked");
          User.findByIdAndUpdate(
            surveyTemplate.author,
            // $addToSet works like $push but prevents duplicates
            {$addToSet: {"surveyTemplates": surveyTemplate}},
            {safe: true, new: true},
            function(err, user) {
              if(err) {
                console.log(err);
              }
              else {
                console.log(surveyTemplate);
                console.log('Printing user...');
                console.log(user);
              }
            }
          );
    } else {
      console.log(err);
    }
  });


  console.log();
  console.log('SURVEY CREATED aJJJJJJJJJJJJJ');
  console.log();
  res.send(surveyTemplate);
};

exports.preview = function (req, res) {
  //TODO: fix preview
  console.log();
  console.log('Inside preview');
  var surveyTemplate = new SurveyTemplate(req.body);
  User.findById(surveyTemplate.author, function (err, user) {
    console.log(user.phoneNumber);
    twilio.sendMessage({
      to: user.phoneNumber,
      from: config.phoneNumbers.reminders,
      body: 'Hi! Here\'s a survey your coach wanted me to send you.'
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
            } else {
              console.log(err);
            }
          });
          index++;
        }
      }
    });
  });
  console.log(surveyTemplate);
  res.send(surveyTemplate);
};
