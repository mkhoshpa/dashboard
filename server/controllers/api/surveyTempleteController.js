'use strict'
var mongoose = require('mongoose');
var SurveyTemplete = require('../../models/surveyTemplete.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var request = require('request');


exports.create = function(req, res) {

  var surveyTemplete = new SurveyTemplete(req.body);
  console.log( surveyTemplete);
  console.log(surveyTemplete.questions);
  surveyTemplete.save(function(err, surveyTemplete) {
    if(!err) {
      User.findByIdAndUpdate(
        surveyTemplete.author,
        {$push: {"surveyTempletes": surveyTemplete}},
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
  //console.log(surveyTemplete);
  res.send(surveyTemplete);
}
