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

surveySchema.pre('remove', function(next) {
  var ids = [];
  var User = this.model('User');
  var self = this;
  // Get user model that the survey is assigned too
  User.findOne({_id: this.assignee}, function(err, user) {
    // Remove Survey Ref
    var index = user.surveys.indexOf(this._id);
    user.surveys.splice(index, 1);
    // Remove Reminder Refs
    for(var i = 0; i < self.goals.length; i++) {
      index = user.reminders.indexOf(self.goals.reminder);
      user.reminders.splice(index, 1);
    }
    // Save with removed refs
    user.save(function(err) {
      if(!err){
        // Flash message?
      }
    });
  })
  // Remove reminders from mongo
  for (var i = 0; i < self.goals.length; i++) {
    Reminder.remove({_id: self.goals[i].reminder._id}).exec();
  }
  next();
});



var Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
