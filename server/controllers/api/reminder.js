'use strict'

var mongoose = require('mongoose');
var Reminder = require('../../models/reminder.js');
var User = require('../../models/user.js');
var moment = require('moment');

exports.create = function(req, res) {
  var reminder = new Reminder(req.body);
  console.log(reminder);
  reminder.save(function(err, reminder) {
    if(!err) {
      User.findByIdAndUpdate(
        reminder.assignee,
        {$push: {"reminders": reminder._id}},
        {safe: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
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

      res.send(reminder);
    }
  });
}
//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

exports.update = function(req, res) {

  // Reminder.findById(req.params.id, function(err, reminder) {
  //   if(reminder.parent.id) {
  //     // Counts "" as characters in the string, need to remove to convert to ObjectId
  //     var id = mongoose.Types.ObjectId(reminder.parent.id.slice(1,25));
  //     var Model = require('../../models/' + reminder.parent.model + '.js');
  //     Model.findById(id, function(err, model) {
  //       if(err) {
  //         console.log('error - reminder');
  //         console.log(err);
  //       }
  //       else {
  //         for(var i = 0; i < model.goals.length; i++) {
  //           if(model.goals[i].reminder == reminder._id) {
  //             model.goals[i]
  //           }
  //         }
  //       }
  //     });
  //   }
  //   else {
  //     //err
  //   }
  //
  // });

  Reminder.findByIdAndUpdate(
    req.params.id,
    {$set: {
      title: req.body.title,
      timeOfDay: req.body.timeOfDay,
      selectedDates: req.body.selectedDates,
      daysOfTheWeek: req.body.daysOfTheWeek,
      assignee: req.body.assignee
    }},{new: true}, function(err, reminder) {
      if(reminder) {
        console.log(reminder);
        res.send(reminder);
      }
      else{

      }
    }
  );
}

exports.response = function(req, res) {
  var contents = req.body.contents;
  var responseTime = Date.now();
  Reminder.findOneAndUpdate(
    {_id: req.params.id},
    {
      $push: {
        "response": {
          contents: contents,
          responseTime: responseTime
        }
      }
    },
    {
      safe: true,
      new: true
    },
    function(err, doc) {
      if(doc) {
        res.send('success');
      }
    }
  );
}

exports.delete = function(req, res) {
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, reminder) {
      if(reminder) {
        User.findByIdAndUpdate(reminder.assignee,
          {$pull : {'reminders': reminder._id}},
          function(err, model) {
          if(err) {
            // Do some flash message
          }
        });
        res.send('success');
      }
      else{
        res.send('failure');
      }
    }
  );
}

exports.listNow = function(req,res) {
    console.log("testing how soon is now");
    //test virtuals
   // var reminder = Reminder.makeDefaultReminder();
   // console.log("this is a reminder");
   // console.log(reminder.hour);
   // console.log(reminder.minute);
   // console.log(reminder.days);


   var now = new Date();
   console.log(now);
   var hoursNow = now.getHours();
   console.log("the hours now are" + hoursNow);
   var minutesNow = now.getMinutes();


   var dayNow = now.getDay();
   console.log(dayNow);
   console.log("the day now is " + dayNow);


   Reminder.find({days: dayNow})
        .where('hour').equals(hoursNow)
        .where('minute').equals(minutesNow)
        .populate('assignee')
        .populate('slack')
        .exec(function(err, docs){
            console.log(err);  //returns Null
            console.log(docs);
             //returns Null.

             res.json(docs);
    });

}

exports.list = function(req, res) {
  Reminder.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminders that need to go out
