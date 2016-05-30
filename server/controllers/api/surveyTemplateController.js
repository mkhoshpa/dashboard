'use strict'
var mongoose = require('mongoose');
var SurveyTemplate = require('../../models/surveyTemplate.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var request = require('request');


exports.create = function(req, res) {

  var surveyTemplate = new SurveyTemplate(req.body);
  console.log(surveyTemplate);
  console.log(surveyTemplate.questions);
  surveyTemplate.save(function(err, surveyTemplate) {
    if(!err) {
      User.findByIdAndUpdate(
        surveyTemplate.author,
        {$push: {"surveyTemplates": surveyTemplate}},
        {safe: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
            console.log("YES!");
          }
        }
      );
    }
  });
  res.send(surveyTemplate);
}
