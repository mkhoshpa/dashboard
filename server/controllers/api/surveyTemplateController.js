'use strict'
var SurveyTemplate = require('../../models/surveyTemplate.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var request = require('request');

//var config = require('../../config/env/development.js');
var winston = require('winston');
//var builder = require('xmlbuilder');
var fs = require('fs');


var config = require('../../config/env/development.js');


//var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');



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
