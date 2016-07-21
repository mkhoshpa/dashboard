'use strict';

var Note = require('../../models/note.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var winston = require('winston');

exports.create = function(req, res) {
  var note = new Note(req.body);
  console.log("note controller hit");

  note.save(function(err, note) {
    if(!err) {
      console.log("NO Error")
      User.findByIdAndUpdate(
        note.assignee,
        {$push: {"notes": note}},
        {safe: true},
        function(err, user) {
          if(err) {
            winston.error(err);
          }
          else {
            console.log("Note pushed to user.");
            console.log("User is: " + JSON.stringify(user));
          }
        }
      );

      res.send(note);
    }
  });
}

exports.update = function(req, res) {
  console.log('Updating Note');
  console.log();
  Note.findOneAndUpdate({'_id': req.body._id},
  {
    body: req.body.body,
    author:req.body.author,
    assignee:req.body.assignee
  }, {new:true}, function(err, note){
    if(!err){
      console.log('Note updated: ' + note);
      User.findById(req.body.assignee, function(err, user){
        if(err){
          console.log(err);
        }
        var _user = user;
        var user = user.toObject();
        console.log('The user is: ' + JSON.stringify(user));
        console.log('The user\'s id is: ' + user._id);
        console.log('User.notes is: ' + JSON.stringify(user.notes));
        for (var i = 0; i < user.notes.length; i++) {
          if (user.notes[i]._id == req.body._id) {
            user.notes[i] = note;
            console.log(JSON.stringify(user.notes[i]));
            res.send(req.body);
          }
        }
        _user.set(user);
        _user.save(function (err, doc) {
          console.log(JSON.stringify(doc));
        });

      });
    }
    else {
      winston.error("crap");
    }

  });

};

exports.delete = function(req, res) {
  console.log("Here note.delete");
  console.log("id:" + req.params.id);
  Note.findByIdAndRemove(
    req.params.id,
    function(err, note){
      if(note){
        User.findByIdAndUpdate(note.assignee,
          {$pull : {'notes': note}},
          function(err, model){
            if(err){
              console.log("Help");
            }
          });
          res.sendStatus(200);
      }
      else{
        console.log();
        winston.error(err);
        res.sendStatus(500);
      }
    }
  )
};

exports.list = function(req, res) {
  Note.find({}, function(err, obj){
    res.json(obj);
  })
};
