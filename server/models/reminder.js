'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var reminderSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  start: {type: Date, default: Date.now},
  end: {type: Date},
  timesOfDay: [String],
  daysOfWeek: [String],
  weeksOfMonth: [Number],
  // Who the reminder is coming from
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // Who the reminder is going too
  coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
