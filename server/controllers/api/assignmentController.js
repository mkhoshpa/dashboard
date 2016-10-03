'use strict'

var User = require('../../models/user.js'),
Assignment = require('../../models/assignment.js'),
Reminder = require('../../models/reminder.js'),
    SurveyTemplate = require('../../models/surveyTemplate.js'),
AssignmentController = require('./assignmentController.js'),
    async =require('async'),
    Response = require('../../models/response.js'),
config = require ('../../config/env/env.js');

var request = require('request');
var Promise = require("../../../node_modules/promise");
//tackoverflow.com/questions/563406/add-days-to-javascript-date
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

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

exports.createFromSurvey = function(req, res) {
    console.log(req.body);
    var users = req.body.users;
    var surveyInfo = req.body.surveyInfo;
    var selectedSurvey = req.body.selectedSurvey;
    var hour =  req.body.surveyInfo.hour;
    var minute =  req.body.surveyInfo.minute;
    var assignments = [];
    var daysFromFrontEnd =req.body.surveyInfo.selectedDates;
    var i =0;
   for(i=0;i<users.length;i++) {
       var assignmentTemplate = {
           "repeat": surveyInfo.repeat,
           "type": "survey",
           "sent": false,
           "surveyTemplateId": selectedSurvey._id,
           "userId":users[i]._id,
           "hours": surveyInfo.hour,
           "minutes": surveyInfo.minute

       };
       var dateArray = AssignmentController.getRealDates(daysFromFrontEnd, hour, minute);

       for (var date of dateArray) {
           //make a new date
           //set the seconds to zero and console log to confirm
           date.setSeconds(0);
           date.setMilliseconds('00');
           console.log(date + "date after seconds and ms ");
           assignmentTemplate.specificDate = date;
           assignmentTemplate.date = date.toString();
           var assignment = new Assignment(assignmentTemplate);
           assignment.save(function (err, assignment) {
               if (!err) {
                   console.log("we made an assignment !!!!"+JSON.stringify(assignment));
                   i++;
                   assignments.push(assignment);
               }
               else {
                   console.log("assignment save failed");
                   res.status(500);
                   res.send(err);
               }
           })
       }
   }
    res.send(assignments);
}


exports.createFromReminder = function(reminder) {
    //need to read data from reminder to make the right assignements
    //aka get the specific date from the reminder

    var hour = reminder.hour;
    var minute = reminder.minute;
    var assignments = [];
    var daysFromFrontEnd = reminder.selectedDates;

    //for each day in reminder make a new assignemtn

    //TODO need to change this so reminders have access to repeat or not
    var assignmentTemplate = {
        "repeat": reminder.repeat,
        "type": "reminder",
        "sent": false,
        "reminderId": reminder.id,
        "userId": ""+reminder.assignee,

        "hours": reminder.hour,
        "minutes": reminder.minute

    };

    //call a new method to get an array of actual dates from the days of the week

    console.log("days in reminder" + daysFromFrontEnd);

    var dateArray = AssignmentController.getRealDates(daysFromFrontEnd, hour, minute);
    var i = 0;
    for (var date of dateArray) {
        //make a new date
        //set the seconds to zero and console log to confirm
        date.setSeconds(0);
        date.setMilliseconds('00');
        console.log(date + "date after seconds and ms ");
        assignmentTemplate.specificDate = date;
        assignmentTemplate.date = date.toString();
        var assignment = new Assignment(assignmentTemplate);
        assignment.save(function (err, assignment) {
            if (!err) {
                console.log("we made an assignment !!!!");
                i++;
                assignments.push(assignment);
            }
            else {
                console.log("assignment save failed");
            }
        })
    }

        console.log("assignments are" + JSON.stringify(assignments));
        return assignments;

}
//
//not just an array of days going in - its an object with keys for each day and bools if that day is includied
exports.getRealDates = function(daysArrayInput, hourInput, minuteInput) {
  var newDate = new Date;
  var todayDate = newDate.getDay();
  var datesArrayOutput = [];
  var d = [];

  for (var day of daysArrayInput) { 
    var today = todayDate;
    console.log("today is " + today);
    console.log("day in array is " + day);

    if(today < day){
      console.log( today + " is before " + day);
      d = day - today;

    }
    else if(today > day){
      console.log( today + " is after " + day);
      //console.log("greater then");
      d =  7 - (today - day) ;
      
    }
    else {
      console.log( today + " equal to " + day);
      console.log(hourInput);
      if(newDate.getHours() > hourInput){
        console.log("date > timeOfDay");
        d = 7;
      } 
      else if (newDate.getHours() === hourInput){
        if(newDate.getMinutes() < minuteInput){
          console.log(  newDate.getMinutes() + " is before " + minuteInput);
          d = 0;
        }

        else{
          console.log(  newDate.getMinutes() + " is after or same" + minuteInput);
          d=7;
        }
      
      }
      else if(newDate.getHours() < hourInput){
        d=0;
         console.log(  newDate.getHours() + " is before " + hourInput);
      }
      
      else{

        // same hour goes off next week
        console.log("somthings broken");
        
      }
    }

    //TODO
    var finalDate = new Date().addDays(d);
      finalDate.setHours(hourInput);
      finalDate.setMinutes(minuteInput);
    datesArrayOutput.push(finalDate);
      console.log("datesArrayOutput" + datesArrayOutput);
    console.log('added a day' +  d);     
             
  }
  return datesArrayOutput; 
}


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


};
exports.getTypeReminder = function (client, callback) {
    console.log("inside getInfoR");
    //console.log("clientID:");
    //console.log(client);

    Assignment.find({userId : ""+client, type: 'reminder' }, function (err, assignments) {
        if (err) {
            callback(err);

        }
        else {
             console.log('assignment');
            console.log(assignments);
            callback(null , assignments);

        }
    })
}
exports.getTypeSurvey = function (client, callback) {
    console.log("inside getInfoS");
    Assignment.find({userId : ""+client, type: 'survey' }, function (err, assignments) {
        if (err) {
            callback(err);

        }
        else {
            //console.log('assignment');
            //console.log(assignments);
            callback(null , assignments);

        }
    })
}
exports.getClient = function (client, callback) {
    console.log("inside getClient");
    User.findOne({_id: ""+client}, function(err, obj) {
        if (err) {
            callback(error);
        }
        else {
           // console.log('find a ckient////////////////////////////////////////////////////////////////////');
            //console.log(assignments);
            callback(null ,obj);

        }
    })
}
exports.selectR = function(req, res) {
    res.send(req.params.id);
}

exports.selectRemindersByAssignee = function(req, res) {
    console.log("selectRemindersByassignee");
    //console.log(req.body);
    var coach;
    User.findOne({_id: req.params.id}, function(err, obj) {
        if (err) {
            console.log("crap");
        }
        else {
            //console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkk");
            //console.log(obj);
            coach = obj;

            var clients = coach.clients;
            /*clients.forEach(function(client) {
             Assignment.find({userId: client._id}, function (err, assignments) {
             if (err) {
             res.sendStatus(500);

             }
             else {
             // console.log('assignment');
             //console.log(assignments);
             resAssignments = resAssignments.concat(assignments);

             }

             });*/
            var finalAssignments = [];
            var finalReminders = [];
            var finalResponses = [];
            var finalClients=[];
            async.map(clients, AssignmentController.getClient, function (err, results) {
                if (err) {
                    res.send(err);

                }
                else {

                    finalClients=results;

                    //console.log("final clienttttttttttttttt");
                    //console.log(finalClients);
            async.map(clients, AssignmentController.getTypeReminder, function (err, results) {

                if (err) {
                    res.send(err);

                }
                else {
                    console.log('assignmenttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');


                    results.forEach(function (ass) {
                        finalAssignments = finalAssignments.concat(ass);
                    });
                   // console.log( JSON.stringify(finalAssignments));

                    async.map(clients, AssignmentController.getReminders, function (err, results) {
                        if (err) {
                            res.send(err);

                        }
                        else {
                            console.log('Reminderssssssssssssssss');


                            results.forEach(function (reminders) {
                                finalReminders = finalReminders.concat(reminders);
                            });
                            async.map(clients, AssignmentController.getResponses, function (err, results) {
                                if (err) {
                                    res.send(err);

                                }
                                else {
                                    console.log('Responsessssssssssssssss');


                                    results.forEach(function (responses) {
                                        finalResponses = finalResponses.concat(responses);
                                    });
                                    var obj = {
                                        assignments: finalAssignments,
                                        reminders: finalReminders,
                                        responses: finalResponses
                                    };
                                    //res.send(obj);
                                    var returnArray = [];
                                    finalReminders.forEach(function (reminder) {

                                        finalAssignments.forEach(function (assignment) {
                                            if (assignment.reminderId == reminder._id) {
                                                var returnObj = {reminder: reminder, assignment: assignment};
                                                finalClients.forEach(function (client) {
                                                    if (client._id == assignment.userId) {
                                                        returnObj.client = client;


                                                    }
                                                })
                                                finalResponses.forEach(function (response) {
                                                    if (response.assignment == assignment._id) {
                                                        returnObj.response = response;
                                                    }
                                                })
                                                returnArray.push(returnObj);
                                            }
                                        })

                                    })
                                   // console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkk");
                                    //console.log(JSON.stringify(returnArray));
                                    res.send(returnArray);

                                }
                            });

                        }
                    });
                    /*
                     final.forEach(function(ass){
                     var obj = {assignment : ass};
                     ret.push(obj);
                     })
                     async.map(final , AssignmentController.getReminders , function(err, results) {
                     for(var i = 0 ; i< ret; i++){
                     ret[i].reminder = i;
                     }
                     async.map(final , AssignmentController.getResponses , function(err, results) {
                     for(var i = 0 ; i< ret; i++){
                     ret[i].response= results[i];
                     }
                     });
                     //console.log(ret);
                     res.send(ret);

                     });
                     */


                }
            });
                }});

        }
    });


}
exports.selectSurveyByAssignee = function(req, res) {
    console.log("selectByassignee");
    //console.log(req.body);
    var coach;
    User.findOne({_id: req.params.id}, function(err, obj) {
        if (err) {
            console.log("crap");
        }
        else {
            console.log(obj);
            coach = obj;


            var resAssignments = [];
            var coaches = [coach];

            var clients = coach.clients;
            /*clients.forEach(function(client) {
             Assignment.find({userId: client._id}, function (err, assignments) {
             if (err) {
             res.sendStatus(500);

             }
             else {
             // console.log('assignment');
             //console.log(assignments);
             resAssignments = resAssignments.concat(assignments);

             }

             });*/
            var finalAssignments = [];
            var finalReminders = [];
            var finalResponses = [];
            var finalClients = [];
            async.map(clients, AssignmentController.getClient, function (err, results) {
                if (err) {
                    res.send(err);

                }
                else {

                        finalClients=results;

                    console.log("final clienttttttttttttttt");
                    console.log(finalClients);

                    async.map(clients, AssignmentController.getTypeSurvey, function (err, results) {
                        if (err) {
                            res.send(err);

                        }
                        else {
                            console.log('assignmenttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');


                            results.forEach(function (ass) {
                                finalAssignments = finalAssignments.concat(ass);
                            });
                            //console.log(finalAssignments);

                            async.map(coaches, AssignmentController.getSurveys, function (err, results) {
                                if (err) {
                                    res.send(err);

                                }
                                else {
                                    console.log('Surveysssssssssssssssss');


                                    results.forEach(function (surveys) {
                                        finalReminders = finalReminders.concat(surveys);
                                    });
                                    async.map(clients, AssignmentController.getResponses, function (err, results) {
                                        if (err) {
                                            res.send(err);

                                        }
                                        else {
                                            console.log('Responsessssssssssssssss');


                                            results.forEach(function (responses) {
                                                finalResponses = finalResponses.concat(responses);
                                            });

                                            var obj = {
                                                assignments: finalAssignments,
                                                reminders: finalReminders,
                                                responses: finalResponses
                                            };
                                            //res.send(obj);
                                            var returnArray = [];
                                            finalReminders.forEach(function (reminder) {

                                                finalAssignments.forEach(function (assignment) {
                                                    if (assignment.surveyTemplateId == reminder._id) {
                                                        var returnObj = {reminder: reminder, assignment: assignment};
                                                        finalClients.forEach(function (client) {

                                                            if (client._id == assignment.userId) {

                                                               // console.log("yeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyy")
                                                                returnObj.client = client;

                                                            }
                                                        })

                                                        finalResponses.forEach(function (response) {
                                                            if (response.assignment == assignment._id) {
                                                                returnObj.response = response;
                                                            }
                                                        })
                                                        returnArray.push(returnObj)
                                                    }
                                                })

                                            })

                                            res.send(returnArray);
                                        }


                                    });

                                }
                            });
                            /*
                             final.forEach(function(ass){
                             var obj = {assignment : ass};
                             ret.push(obj);
                             })
                             async.map(final , AssignmentController.getReminders , function(err, results) {
                             for(var i = 0 ; i< ret; i++){
                             ret[i].reminder = i;
                             }
                             async.map(final , AssignmentController.getResponses , function(err, results) {
                             for(var i = 0 ; i< ret; i++){
                             ret[i].response= results[i];
                             }
                             });
                             //console.log(ret);
                             res.send(ret);

                             });
                             */


                        }
                    });
                }
            });
        }
    });










}
exports.selectAllByAssignee = function(req, res) {
    console.log("selectByassignee");
 //console.log(req.body);
    var coach = req.body;
    var resAssignments = [];

    var clients = coach.clients;
    /*clients.forEach(function(client) {
        Assignment.find({userId: client._id}, function (err, assignments) {
            if (err) {
                res.sendStatus(500);

            }
            else {
               // console.log('assignment');
                //console.log(assignments);
                resAssignments = resAssignments.concat(assignments);

            }

        });*/
    var finalAssignments=[];
    var finalReminders=[];
    var finalResponses=[];
    async.map(clients, AssignmentController.getTypeReminder , function(err, results) {
        if(err) {
            res.send(err);

        }
        else{
            console.log('assignmenttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');



            results.forEach(function (ass) {
                finalAssignments = finalAssignments.concat(ass);
            });

            async.map(clients, AssignmentController.getReminders , function(err, results) {
                if(err) {
                    res.send(err);

                }
                else{
                    console.log('Reminderssssssssssssssss');



                    results.forEach(function (reminders) {
                        finalReminders = finalReminders.concat(reminders);
                    });
                    async.map(clients, AssignmentController.getResponses , function(err, results) {
                        if(err) {
                            res.send(err);

                        }
                        else{
                            console.log('Responsessssssssssssssss');



                            results.forEach(function (responses) {
                                finalResponses = finalResponses.concat(responses);
                            });
                            var obj = {assignments: finalAssignments, reminders: finalReminders, responses: finalResponses};
                            //res.send(obj);
                           var returnArray=[];
                            finalReminders.forEach(function (reminder){

                                finalAssignments.forEach(function (assignment) {
                                    if(assignment.reminderId == reminder._id) {
                                        var returnObj = {reminder: reminder, assignment: assignment};
                                        clients.forEach(function (client) {
                                            if(client._id == assignment.userId){
                                                returnObj.client = client;
                                            }
                                        })
                                        finalResponses.forEach(function (response) {
                                            if(response.assignment._id == assignment._id){
                                                returnObj.response = response;
                                            }
                                        })
                                        returnArray.push(returnObj);
                                    }
                                })

                            })
                           res.send(returnArray);

                        }
                    });

                }
            }); /*
            final.forEach(function(ass){
                var obj = {assignment : ass};
                ret.push(obj);
            })
            async.map(final , AssignmentController.getReminders , function(err, results) {
                for(var i = 0 ; i< ret; i++){
                    ret[i].reminder = i;
                }
                async.map(final , AssignmentController.getResponses , function(err, results) {
                    for(var i = 0 ; i< ret; i++){
                        ret[i].response= results[i];
                    }
                });
                //console.log(ret);
                res.send(ret);

            });
            */




        }
    });




}

       // console.log('assignmenttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
        //console.log(resAssignments);
       // res.send(resAssignments);

//};
exports.getResponses = function (client, callback) {
    console.log("inside getResponses");
    Response.find({userId: ""+client}, function (err, obj) {
        if(err){
            callback(err);
        }
        else {
            //console.log(obj);
            callback(null , obj);

        }
    })
}
exports.getReminders = function (client , callback) {
    console.log("inside getReminders");
    Reminder.find({assignee: ""+client }, function(err, reminders){
        if(err){
            callback(err);
        }
        else{
            //console.log(reminders);
            callback(null, reminders)
        }
    })
}
exports.getSurveys = function (client , callback) {
    console.log("inside getSurveys");
    SurveyTemplate.find({author: client }, function(err, surveys){
        if(err){
            callback(err);
        }
        else{
            //console.log(surveys);
            callback(null, surveys)
        }
    })
}
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
    now.setSeconds(0);
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


    //Assignment.find({year: yearNow, month: monthNow, date: dateNow})

    Assignment.find({specificDate: now})

    //Assignment.find({})
      // .where('hours').equals(hoursNow)
      // .where('minutes').equals(minutesNow)
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
            request({url: 'http://' + config.server.ip + ':12557/api/assignment/sent/update/' +  assignments[i]._id, method:"PUT"}, function(err, response){
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
            if(assignments[i].repeat && assignments[i].type === "reminder" && assignments[i].userId){
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
                request({url: 'http://' + config.server.ip + ':12557/api/assignment/create', method: "POST", headers: {"content-type": "application/json"}, json: reminderUserAssign}, function (err, response, body) {
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
            request({url: 'http://' + config.server.ip + ':12557/api/assignment/completed/update/'+  assignments[i]._id, method:"PUT"}, function(err, response){
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
    var sundayNext = addDays(today, diff);
    var lastSunday = addDays(today, -day);
    console.log(sundayNext);
    console.log(lastSunday);



    Assignment.find({userId: req.params.id, type:'reminder',
      specificDate: {"$gte": lastSunday, "$lte": sundayNext}})
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
