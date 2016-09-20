'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var assignmentSchema = new Schema({

  repeat: {type: Boolean, default: false},
  type: {
    type: String,
    enum: ['reminder', 'survey'],
    default: 'reminder'},

  specificDate: {type: Date},


  year : {type: String},
  month : {type: String},
  date: {type: String},
  hours: {type: String},
  minutes: {type: String},

  userId: {type: mongoose.Schema.Types.Object, ref: 'User'},

  creationDate: {type: Date, default: new Date()},
  sent: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},
  surveyTemplateId: {type: mongoose.Schema.Types.Object, ref: 'SurveyTemplate'},
  reminderId: {type: mongoose.Schema.Types.Object, ref: 'Reminder'}

});

//put in presave if values are empty
// Use a pre-save middleware to hash the password
assignmentSchema.pre('save', function(next) {
  //ok get the year, month, date and hours and minutes from the specified date
  if(!this.specificDate){ console.log("date not set something is really broke")}

  var today = this.specificDate;
  if(!this.year){
    this.year = today.getFullYear();
    console.log("this year" + this.year);
  }
  if(!this.month){
    this.month = today.getMonth();
  }
  if(!this.date){
    this.date = today.getDate();
  }
  if(!this.hours){
    this.hours = today.getHours();
  }
  if(!this.minutes){
    this.minutes = today.getMinutes();
  }
  next();
});

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
