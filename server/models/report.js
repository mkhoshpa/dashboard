'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Reminder = require('./reminder.js');
var User = require('./user.js');

var reportSchema = new Schema ({
  response: {type: String},
  reminder: {type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'},
  date: {type: Date},
  complete: {type: Boolean},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;
