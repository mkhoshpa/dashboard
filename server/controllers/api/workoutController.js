/**
 * Created by mehrgankhoshpasand on 2016-12-15.
 */
'use strict';

var Reminder = require('../../models/reminder.js'),
    Assignment = require("../../models/assignment.js"),
    Workout= require("../../models/workout.js"),
    AssignmentController = require("./assignmentController.js"),
    workoutController = require("./workoutController.js");

exports.create = function(req, res) {

    var workout = new Workout(req.body);
    console.log("workout controller hit");
    console.log(workout);
    workout.save(function(err, workout) {
        if(!err) {
            res.send(workout);

        } else {
            console.log(err);
            res.status(500);
            res.send(err);
        }
    });


};

exports.list = function(req, res) {
    console.log('inside listvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    var coach = req.params.id;
    console.log(coach);
    Workout.find({author:coach},function (err,workouts) {
        console.log(workouts);
        res.send(workouts);

    })
};
exports.assign = function(req, res) {
    console.log('inside assign');
    var self=this;
    var workoutId = req.params.id;
    var selectedUsers=req.body;
    console.log(selectedUsers);
    console.log(workoutId);
    Workout.findOne({_id:workoutId},function (err,workout) {
        if(!err) {
            selectedUsers.forEach(function (user) {
                 for(var i=0;i<workout.day.length;i++){
                     if(workout.day[i] != null) {
                         workoutController.createFromUserAndDay(user, workout.day[i], workout.author, i);
                     }
                 }




            })
        }


    });
   res.sendStatus(200);
};


exports.createFromUserAndDay=function(user,day,coach,num){
    day.assignments.forEach(function (assignment) {
        if(assignment.time != null && assignment.title != null){

        var time = new Date(assignment.time);
        var now = new Date();
        now.setDate(now.getDate() + num + 1);
        now.setHours(time.getHours());
        now.setMinutes(time.getMinutes());


        var reminderTemplate = {
            title: assignment.title,
            repeat: false,
            author: coach,
            assignee: user._id,
            hour: time.getHours(),
            minute: time.getMinutes(),
            selectedDates: [now.getDay()],
            creationDate: new Date()


        };
        var reminder = new Reminder(reminderTemplate);
        var assignmentTemplate = {
            "repeat": reminder.repeat,
            "type": "reminder",
            "sent": false,
            "reminderId": reminder.id,
            "userId": "" + reminder.assignee,
            "hours": reminder.hour,
            "minutes": reminder.minute

        };
        assignmentTemplate.specificDate = now;
        assignmentTemplate.date = now.toString();
        var assignment = new Assignment(assignmentTemplate);
        console.log('reminder and assignment');
        console.log(reminder);
        console.log(assignment);
        reminder.save(function (err, reminder) {
            if (!err) {
                console.log("reminder created");

            } else {
                console.log(err);

            }
        });
        assignment.save(function (err, assignment) {
            if (!err) {
                console.log("we made an assignment !!!!" + JSON.stringify(assignment));

            }
            else {
                console.log("assignment save failed");

            }
        })

    }
    });


};

