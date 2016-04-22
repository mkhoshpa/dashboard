'use strict'

var mongoose = require('mongoose');
var Habit = require('../../models/habit.js');


exports.create = function(req, res) {
  new Habit({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  }).save(function(err, habit, count) {
    if(err){
      res.send(err);
    } else {
      res.send(habit);
    }
  })
}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  Habit.find({}, function(err,obj) {
    res.json(obj);
  })
}
