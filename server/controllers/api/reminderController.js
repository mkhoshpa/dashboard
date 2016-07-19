'use strict';

var Reminder = require('../../models/reminder.js');
var User = require('../../models/user.js');

exports.create = function(req, res) {
  var reminder = new Reminder(req.body);
  winston.info("reminder controller hit");
  //winston.info(reminder);
  reminder.save(function(err, reminder) {
    if(!err) {
      res.send(reminder);
    } else {
      res.status(500);
      res.send(err);
    }
  });
};

exports.createMessenger = function(req, res) {
  MessengerReminder.create(req.body);
}

exports.read = function(req, res) {

};

//from http://stackoverflow.com/questions/15621970/pushing-object-into-array-schema-in-mongoose
exports.update = function(req, res) {
  winston.info('Updating reminder');
  winston.info();
  ////winston.info(req.body);
  Reminder.findOneAndUpdate({'_id': req.body._id},
  {
    title: req.body.title,
    timeOfDay: req.body.timeOfDay,
    days: req.body.days,
    hour: req.body.hour,
    minute: req.body.minute,
    seletedDates: req.body.selectedDates,
    daysOfTheWeek: req.body.daysOfTheWeek,
    author: req.body.author,
    assignee: req.body.assignee
  }, {new: true}, function (err, reminder) {
    if (!err) {
      winston.info('Reminder updated: ' + reminder);
      res.send(reminder);
    } else {
      res.status(500);
      res.send(err);
    }
  });
}

exports.delete = function(req, res) {
  winston.info();
  winston.info('Inside reminder.delete');
  winston.info('id: ' + req.params.id);
  Reminder.findByIdAndRemove(
    req.params.id,
    function(err, reminder) {
      if(reminder) {
        //winston.info(reminder);
        User.findByIdAndUpdate(reminder.assignee,
          {$pull : {reminders: {_id: reminder._id}}},
          {new: true},
          function(err, model) {
            winston.info();
            winston.info('Should output a user with the specified reminder removed.');
            //winston.info(model);
            res.sendStatus(200);
          if(err) {
            // Do some flash message
          }
        });
      }
      else{
        winston.info();
        winston.info(err);
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
             winston.info(docs);
             winston.info('exec reminder/now');
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
