'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');
var Reminder = require('./reminder.js');
var moment = require('moment');

var reminderResponseSchema = new Schema({
  //need to know what user, date stamp, reminder and status and text block
  text:{type: String},
  createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timeStamp:{type: Date, default: Date.now},
  reminder:{type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'},
  responded:{type:Boolean, default:'false'},
});
//when a response is created, update the connected user and reminder objects
// reminderResponseSchema.pre('save', function(next) {
//   var id = this.createdBy;
//   User.findByIdAndUpdate(
//     id,
//     {$push: {"mostRecentActivity": 130}},
//     {safe: true},
//     function(err, user) {
//       if(err) {
//         console.log(err);
//       }
//       else {
//       }
//     }
//   )
// })

reminderResponseSchema.post('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(
    this.createdBy,
    {mostRecentResponse: this._id},
    {new: true},
    function(err, model) {
      console.log(model);
    }
  );
});


var ReminderResponse = mongoose.model('ReminderResponse', reminderResponseSchema);

//lets make making reminders a piece of cake !

//create a static method to make a default reminders object









// console.log(formatTime(" 1:00"));
// console.log(formatTime("1:00 "));
// console.log(formatTime("1:00"));
// console.log(formatTime("2100"));
// console.log(formatTime("90:00"));

module.exports = ReminderResponse;
