'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messengerReminderSchema = new Schema({
  hour: Number,
  minute: Number,
  text: String,
  originalMessage: Object
});

var MessengerReminder = mongoose.model('MessengerReminder', messengerReminderSchema);
module.exports = MessengerReminder;
