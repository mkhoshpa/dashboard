'use strict'

var mongoose = require('mongoose');
var Note = require('../../models/note.js');
var User = require('../../models/user.js');
var _ = require('underscore');

var Promise = require('bluebird');
var request = require('request');


exports.create = function(req, res) {
  var note = new Note(req.body);
  console.log("note controller hit");
  console.log(note);

  note.save(function(err, note) {
    if(!err) {
      console.log("NO Error")
      User.findByIdAndUpdate(
        note.assignee,
        {$push: {"notes": note._id}},
        {safe: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
          }
        }
      );

      // User.populate(
      //   reminder.assignee,
      //   {path: 'reminders'}, function(err, user) {
      //     if(err) {
      //       // Do something
      //     }
      //     else {
      //     }
      //   }
      // );
      console.log("Did it work?");
      res.send(note);
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

}
