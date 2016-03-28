'use strict'

var mongoose = require('mongoose');
var WillowSurvey = require('../../models/willow-survey.js');


exports.create = function(req, res) {
  console.log(req.body);
  var survey = new WillowSurvey(req.body);
  survey.save(function(err) {
    console.log("error: " + err);
  });
}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  WillowSurvey.find({}, function(err, obj) {
    res.json(obj);
  })
}
