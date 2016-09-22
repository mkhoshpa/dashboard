'use strict';

var Reminder = require('../../models/reminder.js'),
    Assignment = require("../../models/assignment.js"),
    AssignmentController = require("./assignmentController.js");
var Promise = require("../../../node_modules/promise");

var User = require('../../models/user.js');
var mongoose = require('mongoose');
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
    console.log("create reminder and assingments hit!2113");
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

    //TODO check with thom ab out reminder IDs of new and previous ones problem!! assignments does not have uniqe ids!!
    var reminder = req.body;

    console.log("updating reminder hit");
    console.log("req body"+JSON.stringify( reminder));
    // first delete previous one
    deleteForUpdate(reminder,createForUpdate(reminder));
     res.send();


}
var deleteForUpdate = function(reminder){
    var newcreate =  { __v: 0,
        assignee: reminder.assignee,
        author: reminder.author,
        minute:reminder.minute,
        hour:reminder.hour,
        title: reminder.title,
        repeat: reminder.repeat,
        days: [],
        selectedDates: reminder.selectedDates,
        creationDate: new Date() } ;
    console.log('Inside reminder.deleteforupdate');
    console.log("hellloooo"+JSON.stringify(newcreate));
    console.log();

    console.log('id: ' + reminder._id);
    Reminder.findByIdAndRemove(
        reminder._id,
        function(err, rem) {
            if(rem) {
                console.log(rem);

                //now find all the associated assignments and remove them as well
                Assignment.remove({reminderId : reminder._id }, function (err){
                    if(!err){
                        console.log("assignments should be goine now");

                    }else {
                        console.log("error in deleting previous assignments");
                    }
                });
            }
            else{
                console.log();
                console.log(err);

            }
        }
    );
    return newcreate;




};

var createForUpdate = function(reminder){
    var reminderAndAssignments = {
        reminder: [],
        assignmentArray: []
    };
    console.log("create reminder and assingments hittttttttttttttttttttttttttttttttt");
    var newcreate =  { __v: 0,
        assignee: reminder.assignee,
        author: reminder.author,
        minute:reminder.minute,
        hour:reminder.hour,
        title: reminder.title,
        repeat: reminder.repeat,
        days: [],
        selectedDates: reminder.selectedDates,
        creationDate: new Date() } ;

    var newreminder = new Reminder(newcreate);
    console.log("check the id");
    console.log(newreminder);
    newreminder._id= mongoose.Types.ObjectId();
    console.log("check the id");
    console.log(newreminder);
    //console.log(newreminder);
    //this is goindg to be an array of assignemtns
    newreminder.save(function(err, remind) {
        if(!err) {
            console.log("reminder created");

        } else {
            console.log(err);

        }
    });

    var assignments = AssignmentController.createFromReminder(newreminder);



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
                  res.send(reminder);
              }else {
                  res.sendStatus(500);
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
