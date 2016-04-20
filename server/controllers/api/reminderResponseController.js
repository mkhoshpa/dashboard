'use strict'

var mongoose = require('mongoose');
var ReminderResponse = require('../../models/reminderResponse.js');
var User = require('../../models/user.js');
var moment = require('moment');


exports.create = function(req, res) {
  var reminderResponse = new ReminderResponse(req.body);
  console.log("reminderResponse controller hit");
  console.log(reminderResponse);
  reminderResponse.save(function(err, reminderResponse) {
    if(!err) {
      User.findByIdAndUpdate(
        reminderResponse.createdBy,
        {$push:{"responses": reminderResponse._id}},
        {safe: true, new:true},

        function(err, user) {
          if(err) {
            console.log(err);
          }
          else {
            console.log(JSON.stringify(user));
          }
        }
      );

      // User.populate(
      //   reminderResponse.assignee,
      //   {path: 'reminderResponses'}, function(err, user) {
      //     if(err) {
      //       // Do something
      //     }
      //     else {
      //     }
      //   }
      // );

      res.send(reminderResponse);
    }
  });
}
//fire a console log statement if we recieve a response


//User.populate(req.user, {path: 'clients'}, function(err, user) {

exports.read = function(req, res) {

}

exports.update = function(req, res) {

  // reminderResponse.findById(req.params.id, function(err, reminderResponse) {
  //   if(reminderResponse.parent.id) {
  //     // Counts "" as characters in the string, need to remove to convert to ObjectId
  //     var id = mongoose.Types.ObjectId(reminderResponse.parent.id.slice(1,25));
  //     var Model = require('../../models/' + reminderResponse.parent.model + '.js');
  //     Model.findById(id, function(err, model) {
  //       if(err) {
  //         console.log('error - reminderResponse');
  //         console.log(err);
  //       }
  //       else {
  //         for(var i = 0; i < model.goals.length; i++) {
  //           if(model.goals[i].reminderResponse == reminderResponse._id) {
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
  console.log("api reminderResponse update workded");
  console.log(req.body);

  ReminderResponse.findByIdAndUpdate(
    req.params.id,
    {$set: {
      title: req.body.title,
      timeOfDay: req.body.timeOfDay,
      selectedDates: req.body.selectedDates,
      daysOfTheWeek: req.body.daysOfTheWeek,
      assignee: req.body.assignee
    }},{new: true}, function(err, reminderResponse) {
      if(reminderResponse) {
        console.log(reminderResponse);
        res.send(reminderResponse);
      }
      else{

      }
    }
  );
}

exports.response = function(req, res) {
  var contents = req.body.contents;
  var responseTime = Date.now();
  ReminderResponse.findOneAndUpdate(
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
  reminderResponse.findByIdAndRemove(
    req.params.id,
    function(err, reminderResponse) {
      if(reminderResponse) {
        User.findByIdAndUpdate(reminderResponse.assignee,
          {$pull : {'reminderResponses': reminderResponse._id}},
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
   // var reminderResponse = reminderResponse.makeDefaultreminderResponse();
   // console.log("this is a reminderResponse");
   // console.log(reminderResponse.hour);
   // console.log(reminderResponse.minute);
   // console.log(reminderResponse.days);


   var now = new Date();
   console.log(now);
   var hoursNow = now.getHours();
   console.log("the hours now are" + hoursNow);
   var minutesNow = now.getMinutes();


   var dayNow = now.getDay();
   console.log(dayNow);
   console.log("the day now is " + dayNow);


   ReminderResponse.find({days: dayNow})
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
  ReminderResponse.find({}, function(err, obj) {
    res.json(obj);
  })
}

//need a method to find all the reminderResponses that need to go out
