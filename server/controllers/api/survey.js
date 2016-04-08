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
    console.log('exectued');
    console.log(goal);
    request.post('http://localhost:3000/api/reminder', {
      form: {
        title: goal.action,
        time: goal.time,
        selectedDates: ['Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Satudray'],
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
        console.log(reminder);

        var reminder = JSON.parse(reminder);

        console.log('body');
        var temp = {
          goal: goal.goal,
          reminder: reminder._id
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
              res.send(survey);
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

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  Survey.find({}, function(err, obj) {
    res.json(obj);
  })
}
