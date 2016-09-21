'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var reminderSchema = new Schema({
  title: {type: String, required: true},
  creationDate: {
      type: Date, default: Date.now
  },
  selectedDates: [String],
  daysOfTheWeek: {
    monday: {type: Boolean},
    tuesday: {type: Boolean},
    wednesday: {type: Boolean},
    thursday: {type: Boolean},
    friday: {type: Boolean},
    saturday: {type: Boolean},
    sunday: {type: Boolean}
  },



  days: [{type: Number, min: 0, max: 6}],
  hour: {type: Number, min: 0, max: 23},
  minute: {type: Number, min:0, max:59},
  repeat: {type: Boolean},
  assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}


});



reminderSchema.methods.parseDates = function() {

  this.days = [];
  if(this.daysOfTheWeek.sunday){
      this.days.splice(this.days.length,0,0);
  };
  if(this.daysOfTheWeek.monday){
      this.days.splice(this.days.length,0,1);
  };
  if(this.daysOfTheWeek.tuesday){
      this.days.splice(this.days.length,0,2);
  };
  if(this.daysOfTheWeek.wednesday){
      this.days.splice(this.days.length,0,3);
  };
  if(this.daysOfTheWeek.thursday){
      this.days.splice(this.days.length,0,4);
  };
  if(this.daysOfTheWeek.friday){
      this.days.splice(this.days.length,0,5);
  };
  if(this.daysOfTheWeek.saturday){
      this.days.splice(this.days.length,0,6);
  };

  this.hour = this.timeOfDay.getHours();
  this.minute = this.timeOfDay.getMinutes();

};

var Reminder = mongoose.model('Reminder', reminderSchema);



module.exports = Reminder;
