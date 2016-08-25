'use strict'

var User = require('../../models/user.js'),
Assignment = require('../../models/assignment.js'),
winston = require('winston');

var request = require('request');
exports.create = function(req, res) {
  var assignment = new Assignment(req.body);
  console.log("ass");
  console.log(assignment);

  console.log("time");
  console.log(assignment.specificDate);

  console.log("assignment controller");
  assignment.save(function(err, assignment){
    if(err){
      console.log(err);
    }
    else {
      console.log(assignment);
      res.send(assignment)
    }
  })

};

exports.read = function(req, res) {

};

exports.update = function(req, res) {

};

exports.delete = function(req, res) {
  var assignment = new Assignment(req.body);
  assignment.remove(function (err, assignment) {
    if (!err) {
      res.send(assignment);
    }
  });
};

exports.selectedByReminder = function (req, res) {
  console.log(req.params.id);

  Assignment.find({reminderId: req.params.id}, function(err, assignments){
    if(err){
      console.log(err);
    }
    else{
      console.log('assignment');
      console.log(assignments);
      res.json(assignments)
    }


  })

}

exports.selectedByUser = function (req, res) {
  console.log(req.params.id);

  Assignment.find({userId: req.params.id, type: 'survey'})
    .populate('surveyTemplateId')
    .exec(function (err, assignments) {
      if(err){
        console.log('err');
        console.log(err);
      }
      else{
        console.log('assignments');
        console.log(assignments);
        res.json(assignments);
      }

    })


}





// exports.reminderSelectedByUserId = function(req, res){
//   console.log(req.params.id);
//   Assignment.find({userId: req.params.id, type: 'reminder'})
//   .populate('reminderId')
//   .exec(function (err, assignments) {
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(assignments);
//       res.json(assignments);
//     }
//   })
// }












// exports.reminderSelectedByUserId = function(req, res){
//   console.log(req.params.id);
//   var dateNow = new Date();
//
//
//   Assignment.find({userId: req.params.id, type: 'reminder'})
//   .populate('reminderId')
//   .exec(function (err, assignments) {
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("here");
//       console.log(assignments);
//       assignments.forEach(function(assignment){
//         //wrong
//         if(assignment.date > dateNow && assignment.repeat){
//           console.log("mark 1");
//         }
//
//
//       })
//       res.json(assignments);
//     }
//   })
// }

exports.completed = function (req, res) {
  console.log("here completed");
  console.log(req.params.id);
  Assignment.update({_id: req.params.id}, {$set: {completed: true}}, function(err, obj){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log(obj);
      res.sendStatus(204);
    }


  })
}

exports.sent = function (req, res) {
  console.log("here completed");
  console.log(req.params.id);
  Assignment.update({_id: req.params.id}, {$set: {sent: true}}, function(err, obj){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log(obj);
      res.sendStatus(204);
    }


  })


}
















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

  var addDays = function(date, days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log("date");
    console.log(result);
    return result;
  }

  var now = new Date();
  now.setMilliseconds('00');
  console.log('now');
  console.log(now);
  var nextWeek = addDays(now,7)

  var yearNow  = now.getFullYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();
  var hoursNow = now.getHours();
  var minutesNow = now.getMinutes();
  console.log(monthNow);
//TODO fix time on the month
  var yearNext = nextWeek.getFullYear();
  var monthNext = nextWeek.getMonth();
  var dateNext= nextWeek.getDate();
  var hoursNext = nextWeek.getHours();
  var minutesNext = nextWeek.getMinutes();

  // console.log(yearNow);
  // console.log(monthNow);
  // console.log(dateNow);
  // console.log(hoursNow);
  // console.log(minutesNow);
  //
  // console.log(nextWeek);
  // console.log(yearNext);
  // console.log(monthNext);
  // console.log(dateNext);
  // console.log(hoursNext);
  // console.log(minutesNext);


  Assignment.find({year: yearNow, month: monthNow, date: dateNow})
       .where('hours').equals(hoursNow)
       .where('minutes').equals(minutesNow)
       .where('completed').equals(false)
       .populate('userId')
       .populate('surveyTemplateId')
       .populate('reminderId')
       .exec(function(err, assignments) {
         console.log(assignments);
         console.log('exec assignments/now');
         if(!err){

           //ok so first I need to iterate thru the assignments array

           //create a variable to store the trimmed data in
          var convos = [];

          for (var i = 0; i < assignments.length; i++) {

            //only gets sent if bot is on


            //TODO change ip
            request({url: 'http://localhost:12557/api/assignment/sent/update/'+  assignments[i]._id, method:"PUT"}, function(err, response){
              console.log("sweet 2");
              if(err){
                console.log("error");
                console.log(err);
              }
              else{
                console.log('response');
                console.log(response.statusCode);
              }
            })

            //Creating a new assignment if repeat === true
            if(assignments[i].repeat && assignments[i].type === "reminder"){
              console.log('in create');

                var reminderUserAssign = {
                  repeat: assignments[i].repeat,
                  specificDate: nextWeek,
                  year: yearNext,
                  month: monthNext,
                  date: dateNext,
                  hours: hoursNext,
                  minutes: minutesNext,
                  userId: assignments[i].userId._id,
                  reminderId: assignments[i].reminderId._id,
                  type: 'reminder'
                }
                console.log(reminderUserAssign);

                console.log("Im heading out");
                //TODO change ip
                request({url: 'http://localhost:12557/api/assignment/create', method: "POST", headers: {"content-type": "application/json"}, json: reminderUserAssign}, function (err, response, body) {
                  console.log("sweet");
                  if(err){
                    console.log("ERROR");
                    console.log(err);
                  }
                  else {
                    console.log('response');
                    console.log(response.statusCode);
                  }
                });
            }

            //updating assignment to be completed
            //TODO change ip
            request({url: 'http://localhost:12557/api/assignment/completed/update/'+  assignments[i]._id, method:"PUT"}, function(err, response){
              console.log("sweet 2");
              if(err){
                console.log("error");
                console.log(err);
              }
              else{
                console.log('response');
                console.log(response.statusCode);
              }
            })

            //console.log(assignments[i]);
            var convo = new Object;
            convo.assignmentId = assignments[i]._id;

            convo.userId  =  assignments[i].userId._id;
            convo.userMedium  =  assignments[i].userId.defaultCommsMedium;
            convo.userContactInfo = {};
            convo.userContactInfo.phoneNumber  =  assignments[i].userId.phoneNumber;
            if(assignments[i].userId.slack_id){
              console.log("getting slack_id");
              convo.userContactInfo.slack_Id = assignments[i].userId.slack_id;
            }
            else{
              console.log("no slack_Id");
            }
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
                 convo.questions = [
                   {
                     question:null
                   }
                 ];
                 convo.questions[0].question = assignments[i].reminderId.title;
                 console.log(convo);
            } else {

                console.error("invalid assignment type");
              }
              convos.push(convo);
            }
            res.json(convos);
          }
         else

           console.log(err);
       });

};


exports.list = function(req, res) {
  Assignment.find({}, function(err, obj) {
    res.json(obj);
  })
}

exports.selectedlist  = function (req, res) {
  console.log(req.params.id);
  Assignment.find({surveyTemplateId:req.params.id}, function(err, obj){
    if(err){
      console.log("crap");
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  });
};

exports.pathSelectedByUserId = function (req, res) {
  var addDays = function(date, days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log("date");
    console.log(result);
    return result;
  }
  console.log("path");
  console.log(today);
  var today = new Date();
  var day = today.getDay();
  var diff = 7 - day;
  console.log(diff);
  var sunday = addDays(today, diff);
  console.log(sunday);







  Assignment.find({userId: req.params.id, 
    specificDate: {"$gte": today, "$lte": sunday}})
    .populate('reminderId')
    .populate('surveyTemplateId')
    .exec(function(err, obj){
      if(err){
        console.log(err);
      }
      else{
        console.log(obj);
        res.send(obj);
      }

    })

}
