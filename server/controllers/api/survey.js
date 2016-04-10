'use strict'

var mongoose = require('mongoose');
var Survey = require('../../models/surveys.js');
var _ = require('underscore');
var request = require('request');
var User = require('../../models/user.js');

exports.create = function(req, res) {

  var index = 0;
  var goals = req.body.goals;
  var length = goals.length;

  req.body.goals = [];
  var survey = new Survey(req.body);

  // Create a reminder object to associat with each goal
  // Push those to the survey object, and save

  _.forEach(goals, function(goal) {
    request.post('http://localhost:3000/api/reminder', {
      form: {
        title: goal.action,
        timeOfDay: goal.time,
        selectedDates: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        daysOfTheWeek: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true
        },
        assignee: req.body.assignee,
        author: req.body.author
      }
    }, function(err, response, reminder) {
      if(err) {
        console.log(err);
      }
      else {
        var reminder = JSON.parse(reminder);
        var temp = {
          goal: goal.goal,
          reminder: reminder
        }
        survey.goals.push(temp);
        index++;
        if(index == length) {
          survey.save(function(err, survey) {
            if(err) {
                console.log(err);
                // flash message
            }
            else {
              attach(survey._id, survey.assignee);
              Survey.populate(survey, {
                path: 'goals',
                populate: {
                  path: 'reminder'
                }
              }, function(err, survey) {
                res.send(survey);
              });
            }
          });
        }
      }
    });
  });

  // Attach the survey objec to the User
  function attach(id, assignee) {
    User.findByIdAndUpdate(
      assignee,
      {$push: {"surveys": id}},
      {safe: true},
      function(err, user) {
        if(err) {
          console.log(err);
        }
        else {
          console.log(user);
        }
      }
    );
  }

}

exports.read = function(req, res) {

}

exports.update = function(req, res) {
  // Survey.findByIdAndUpdate(
  //   req.params.id,
  //   {$set: {
  //
  //   }}, {new: true}, function(err, survey) {
  //     if(survey) {
  //       res.send(survey);
  //     }
  //   }
  // );
  console.log('exports . update');
  console.log(req.body);
  // For goal, update
  for(var i = 0; i < req.body.goals.length; i++ ){

  }
  var survey = new Survey(req.body);
  survey.save(function(err, survey) {
      if(!err) {
        console.log(survey);
      }
  });
}

exports.delete = function(req, res) {
  var survey = new Survey(req.body);
  survey.remove(function(err, survey){
    if(!err) {
      res.send(survey);
    }
  });
}

exports.list = function(req, res) {
  Survey.find({}, function(err, obj) {
    res.json(obj);
  })
}
