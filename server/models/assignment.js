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

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
