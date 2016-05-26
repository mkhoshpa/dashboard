'use strict'
var mongoose = require('mongoose');
var SurveyTemplete = require('../../models/surveyTemplete.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var request = require('request');


exports.create = function(req, res) {
  console.log(req.body);
  //var surveyTemplete = new SurveyTemplete(req.body);
  console.log("here");
  //console.log(surveyTemplete);
  res.send({});
}
