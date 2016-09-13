'use strict';

var Reminder = require('../../models/reminder.js'),
    Assignment = require("../../models/assignment.js"),
    AssignmentController = require("./AssignmentController.js");
var Promise = require("../../../node_modules/promise");

var User = require('../../models/user.js');

exports.create = function(req, res) {

  var reminder = new Reminder(req.body);
  console.log("reminder controller hit");
  //console.log(reminder);
  reminder.save(function(err, reminder) {
    if(!err) {
      res.send(reminder);

    } else {
      res.status(500);
      res.send(err);
    }
  });


};
exports.returnMultiply = function(a, b) {
  return a* b;
}
exports.createReminderAndAssignments = function(req, res) {
    var reminderAndAssignments = {
        reminder: [],
        assignmentArray: []
    };
    console.log("create reminder and assingments hit");
    var reminder = new Reminder(req.body);
    console.log(reminder);
    //this is going to be an array of assignemtns

    var assignments = AssignmentController.createFromReminder(reminder);

    //TODO switch to promises
    reminder.save(function(err, reminder) {
        if(!err) {
            console.log("reminder created");

        } else {
            console.log(err);
            res.status(500);
            res.send(err);
        }
    });
    reminderAndAssignments.reminder = reminder;
    
    reminderAndAssignments.assignmentArray = assignments;
    res.send(reminderAndAssignments);

}

exports.createMessenger = function(req, res) {
  MessengerReminder.create(req.body);
}

exports.read = function(req, res) {

};

//from http://stackoverflow.com/questions/15621970/pushing-object-into-array-schema-in-mongoose
// req is convoReminderResponse object
exports.update = function(req, res) {
  //console.log('Updating reminder');
  //console.log();
  //////console.log(req.body);
  //Reminder.findOneAndUpdate({'_id': req.body._id},
  //{
    //title: req.body.title,
    //timeOfDay: req.body.timeOfDay,
    //days: req.body.days,
    //hour: req.body.hour,
    //minute: req.body.minute,
    //seletedDates: req.body.selectedDates,
    //daysOfTheWeek: req.body.daysOfTheWeek,
    //author: req.body.author,
    //assignee: req.body.assignee
  //}, {new: true}, function (err, reminder) {
    //if (!err) {
      //console.log('Reminder updated: ' + reminder);
      //res.send(reminder);
    //} else {
      //res.status(500);
      //res.send(err);
    //}
  //});
    //TODO check with thom ab out reminder IDs of new and previous ones problem!! assignments does not have uniqe ids!!
    var reminder = req.body.reminder;
    var contentArray = req.body.contentArray;
    console.log("updating reminder hit");
    console.log("reminder is"+JSON.stringify(reminder));
    // first delete previous one
     deleteForUpdate(reminder).then(function(response) {
        var reminderAndAssignments = createForUpdate(reminder);
        res.send(reminderAndAssignments);
    });
}
var deleteForUpdate = function(reminder){
    return new Promise(function(resolve,reject) {

        if(Reminder.findByIdAndRemove(
            reminder._id,
            function(err, rem) {
                if(rem) {
                    console.log(rem);

                    //now find all the associated assignments and remove them as well
                    Assignment.remove({reminderId : reminder._id }, function (err){
                        if(!err){
                            console.log("assignments should be goine now");
                        }
                    });
                }
                else{
                    console.log();
                    console.log(err);

                }
            }
        )) {
            resolve('success');
            //reject('error');
        }
    });

};

var createForUpdate = function(reminder){
    var reminderAndAssignments = {
        reminder: [],
        assignmentArray: []
    };
    console.log("create reminder and assingments hittttttttttttttttttttttttttttttttt");
    var newreminder = new Reminder(reminder);
    //console.log(newreminder);
    //this is goindg to be an array of assignemtns

    var assignments = AssignmentController.createFromReminder(newreminder);


    newreminder.save(function(err, remind) {
        if(!err) {
            console.log("reminder created");

        } else {
            console.log(err);
            res.status(500);
            res.send(err);
        }
    });
    reminderAndAssignments.reminder = newreminder;

    reminderAndAssignments.assignmentArray = assignments;
    return reminderAndAssignments ;
}
var filterAssignments = function(contentArray){
    var newArray=[];
    var now = Date();

    for (var i=0;i<contentArray.length;i++){
        if(contentArray[i].ass.specificDate < now){
            newArray.push(contentArray[i].ass);
        }
        else{
           //TODO delet the assign from db

        }

    }
    console.log(JSON.stringify("new array is    "+JSON.stringify(newArray)));
    return newArray;
}
exports.delete = function(req, res) {
  console.log();
  console.log('Inside reminder.delete');
  console.log('id: ' + req.params.id);
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, reminder) {
      if(reminder) {
          console.log(reminder);

          //now find all the associated assignments and remove them as well
          Assignment.remove({reminderId : req.params.id }, function (err){
              if(!err){
                  console.log("assignments should be goine now");
              }
          });
      }
      else{
        console.log();
        console.log(err);
        res.sendStatus(500);
      }
    }
  );
}

exports.listNow = function(req,res) {

   var now = new Date();
   var hoursNow = now.getHours();
   var minutesNow = now.getMinutes();
   var dayNow = now.getDay();

   Reminder.find({days: dayNow})
           .where('hour').equals(hoursNow)
           .where('minute').equals(minutesNow)
           .populate('assignee')
           .populate('slack')
           .exec(function(err, docs){
             console.log(docs);
             console.log('exec reminder/now');
             if(docs){
               res.json(docs);
             }
             else {
               winston.error(err);
             }
           });
}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

exports.selectedByUser = function (req, res) {
  console.log(req.params.id);

  Reminder.find({assignee: req.params.id}, function(err, reminders){
    if(err){
      console.log(err);
    }
    else{
      console.log(reminders);
      res.json(reminders)
    }
  })

}
