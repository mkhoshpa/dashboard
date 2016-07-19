'use strict'

var mongoose = require('mongoose');
var User = require('../../models/user.js'),

Assignment = require('../../models/assignment.js');

///create a assignment.js or change as assignment for right now is only a string.

//not used
exports.create = function(req, res) {
  var assignment = new Assignment(req.body);
  console.log("assignment controller");
  console.log(assignment);
  assignment.save(function(err, assignment){
    // if(!err){
    //   User.findByIdAndUpate(
    //     assignment.assignee,
    //     {$push: {"assignment":
    //     }}
    //   )
    // }
  })
  res.send({});

}


exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {
  var assignment = new Assignment(req.body);
  assignment.remove(function (err, assignment) {
    if (!err) {
      res.send(assignment);
    }
  });
};

exports.removeByReminderId = function (req, res) {
  // Find all of the assignments with the reminder id that was passed in
  Assignment.find({reminderId: res.body}, function (err, assignments) {
    // Go through all of the assignments
    for (var i = 0; i < assignments.length; i++) {
      var assignment = assignments[i];
      // Remove the assignment
      Assignment.findByIdAndRemove(assignment._id, function (err, assignment) {
        // Do nothing in the callback
      });
    }
  });
  res.sendStatus(200);
};

exports.convosNow = function(req, res) {
  var now = new Date();
  var hoursNow = now.getHours();
  var minutesNow = now.getMinutes();
  var dayNow = now.getDay();

  Assignment.find({days: dayNow})
       .where('hour').equals(hoursNow)
       .where('minute').equals(minutesNow)
       .populate('userId')
       .populate('surveyTemplateId')
       .populate('reminderId')
       // we might need these but I doubt it .populate('surveyTemplateId')

       .exec(function(err, assignments){


        // console.log("testing" + assignments);
         console.log(assignments);
         console.log('exec assignments/now');
         if(!err){
          //  for(var i = 0; i <assignments.length; i++){
          //    var questionsId = assignments[i].surveyTemplateId.questions;
          //    for (var j = 0; j < questionsId.length; j++){
          //      SurveyQuestion.findById(questionsId._id)
          //    }
          //
          //  SurveyQuestion.findById


           //ok now we need to get the questions

           //res.send(assignments);

           //ok so first I need to iterate thru the assignments array

           //create a variable to store the trimmed data in
           var convos = [];

          for (var i = 0; i < assignments.length; i++) {
            console.log(assignments[i]);
            var convo = new Object;
            convo.assignmentId = assignments[i]._id;

            convo.userId  =  assignments[i].userId._id;
            convo.userMedium  =  assignments[i].userId.defaultCommsMedium;
            convo.userContactInfo = {};
            convo.userContactInfo.phoneNumber  =  assignments[i].userId.phoneNumber;
            //convo.questions  =  assignments[i].questions;
            convo.type  =  assignments[i].type;

            if(convo.type == "survey"){
              console.log("we got a survey over here");
              convo.questions = assignments[i].surveyTemplateId.questions;
          //      //get survey template id
              convo.surveyId = assignments[i].surveyTemplateId._id;
            } else if (convo.type == "reminder"){
                 console.log("we got a reminder");
                 convo.reminderId = assignments[i].reminderId._id;
                 convo.questions = [];
                 convo.questions[0] = assignments[i].reminderId.title;
            } else {
                console.error("invalid assignment type");
            }
          convos.push(convo);
            }
            res.json(convos);
           //
          //  //need to add time in here ? maybe not
           //
          //  //trim the data so I can make a convo object
           //
           //
          //  //create the convo object
          //  console.log(convos);
          //  res.json(convos);
         }
         else
           console.log(err);
       });

}
exports.selectedlist = function (req, res) {
  console.log(req.params.id);
  Assignment.find({surveyTemplateId: req.params.id}, function(err, obj){
    if(err){
      console.log("crap");
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  })



}























exports.list = function(req, res) {
  Assignment.find({}, function(err, obj) {
    res.json(obj);
  })


}
