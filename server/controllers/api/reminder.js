'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var moment = require('moment');


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

exports.listNow = function(req,res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}
exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminders that need to go out
