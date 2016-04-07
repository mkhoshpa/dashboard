'use strict'

var mongoose = require('mongoose');
var Survey = require('../../models/surveys.js');


exports.create = function(req, res) {
  console.log(req.body);
}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  Survey.find({}, function(err, obj) {
    res.json(obj);
  })
}
