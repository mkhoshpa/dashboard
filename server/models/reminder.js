'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');
var moment = require('moment');

var reminderSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  start: {type: Date, default: Date.now},
  timeOfDay: {
    type: Date, default: Date.now
      // validate:{
      //   validator: function(v) {
      //     return formatTime(v);
      //
      //   },
      //   message: '{value} is not a valid time'
      // },
      // required: [true, 'you gotta tell us when to remind you !']
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
  
   // Who the reminder is coming from
  days: [{type: Number, min: 0, max: 6}],
  hour: {type: Number, min: 0, max: 23},
  minute: {type: Number, min:0, max:59},

  assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // Who the reminder is going too
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

reminderSchema.statics.makeDefaultReminder = function () {
    var reminder = new Reminder();
    reminder.save(function (err) {
        if (err) return err;
    })
    return reminder;
        
};
reminderSchema.pre('save', function(next) {
    if(true){
        console.log("hello");
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
        console.log("DAYS FOR DAYS");
        console.log(this.days);
    };
    
    if(true){
        this.hour = this.timeOfDay.getHours();
        console.log(this.hour + "this is the hour");
    }
    if(true){
        this.minute = this.timeOfDay.getMinutes();
        console.log("this is the minute" + this.minute);
    }
    next();
});
    
    //










var Reminder = mongoose.model('Reminder', reminderSchema);

//lets make making reminders a piece of cake ! 

//create a static method to make a default reminders object









// console.log(formatTime(" 1:00"));
// console.log(formatTime("1:00 "));
// console.log(formatTime("1:00"));
// console.log(formatTime("2100"));
// console.log(formatTime("90:00"));

module.exports = Reminder;
