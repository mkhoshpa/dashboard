'use strict'
var SurveyTemplate = require('../../models/surveyTemplate.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var request = require('request');

exports.update = function(req, res){
  console.log("Im updating");
  console.log(req.params.id);
  console.log(req.body);

  SurveyTemplate.findByIdAndUpdate(
    {_id: req.params.id},{$set: req.body},   function(err, doc){
      if(err){
        console.log("oh crap error");
      }
      else{
        console.log(doc);
      }
    })
    res.send(req.body);

}

exports.find = function (req, res) {
var config = require('../../config/env/development.js');
}

exports.create = function(req, res) {
  console.log();
  console.log('CREATING SURVEY');
  console.log(req.body);
  console.log();
}


var config = require('../../config/env/development.js');
var winston = require('winston');
var builder = require('xmlbuilder');
var fs = require('fs');

exports.create = function(req, res) {
  winston.info();
  winston.info('CREATING SURVEY');
  //winston.info(req.body);
  winston.info();

  var surveyTemplate = new SurveyTemplate(req.body);
  surveyTemplate.save(function(err, surveyTemplate) {
    if(!err) {
      winston.info("this worked");
      User.findByIdAndUpdate(
        surveyTemplate.author,
        // $addToSet works like $push but prevents duplicates
        {$addToSet: {"surveyTemplates": surveyTemplate}},
        {safe: true, new: true},
        function(err, user) {
          if(err) {
            winston.error(err);
          }
          else {
            winston.info(surveyTemplate);
            winston.info('Printing user...');
            winston.info(user);
          }
        }
      );
    } else {
      winston.error(err);
    }
  });
  winston.info();
  winston.info('SURVEY CREATED aJJJJJJJJJJJJJ');
  winston.info();
  res.send(surveyTemplate);
};

exports.preview = function (req, res) {
  winston.info();
  winston.info('Inside preview');
  var surveyTemplate = new SurveyTemplate(req.body);
  User.findById(surveyTemplate.author, function (err, user) {
    winston.log(user.phoneNumber);
    twilio.sendMessage({
      to: user.phoneNumber,
      from: config.phoneNumbers.reminders,
      body: 'Hi! Here\'s a survey your coach wanted me to send you.'
    }, function (err, responseData) {
      if (!err) {
        winston.info(JSON.stringify(responseData));
        // TODO: possibly replace with _.find()
        var index = 0;
        for (var key in surveyTemplate.questions) {
          winston.info('The key is: ' + key);
          winston.info(surveyTemplate.questions[key]);
          winston.info('Sending question: ' + JSON.stringify(surveyTemplate.questions[key].question));
          twilio.sendMessage({
            to: user.phoneNumber,
            from: config.phoneNumbers.reminders,
            body: surveyTemplate.questions[key].question
          }, function (err, responseData) {
            if (!err) {
              winston.info(JSON.stringify(responseData));
            } else {
              winston.error(err);
            }
          });
          index++;
        }
      }
    });
  });
  winston.info(surveyTemplate);
  res.send(surveyTemplate);
};
