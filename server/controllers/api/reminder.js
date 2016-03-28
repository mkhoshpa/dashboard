'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');


exports.create = function(req, res) {
  console.log(req.body);
  var reminder = new Reminder(req.body);
  reminder.save(function(err, reminder) {
    if(!err) {
      res.send(reminder);
    }
  });
}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}
