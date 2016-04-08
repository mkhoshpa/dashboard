'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');
var Reminder = require('./reminder.js');

var surveySchema = new Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  start: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['red', 'yellow', 'green'],
    default: 'green'
  },
  goals: [
    {
      goal: {type: String},
      reminder: {type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'}  
    }
  ]
})

var Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
