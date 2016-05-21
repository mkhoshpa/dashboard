'use strict'

var mongoose = require('mongoose');
var Note = require('../../models/note.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var moment = require('moment');
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
            console.log("Note pushed to user.");
            console.log("User is: " + JSON.stringify(user));
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
      console.log(note);
      res.send(note);
    }
  });
}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {
  Note.findByIdAndUpdate(
    req.params.id,
    function(err, note){
      if(note){
        User.findByIdAndUpdate(note.assignee,
          {$pull : {'notes': note._id}},
          function(err, model){
            if(err){

            }
          });
          res.sendStatus(200);
      }
      else{
        res.sendStatus(500);
      }
    }
  )
}

exports.list = function(req, res) {
  Note.find({}, function(err, obj){
    res.json(obj);
  })
}
