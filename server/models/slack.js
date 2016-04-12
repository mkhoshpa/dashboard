'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var Surveys = require('./survey.js');
var Habits = require('./habits.js');

var SlackSchema = new Schema({
    dashboardUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    team: {type: String},
    id: {type: String},
    username: {type: String},
    channels: [
      {
        id: {type: String},
        name: {type: String}
      }
    ],
    reminders: [
      {
        title: {type: String},
        response: {type: String},
        time: {type: String},
        daysOfWeek: {
          monday: {type: Boolean},
          tuesday: {type: Boolean},
          wednesday: {type: Boolean},
          thursday: {type: Boolean},
          friday: {type: Boolean},
          saturday: {type: Boolean},
          sunday: {type: Boolean}
        },
        active:{type: Boolean}
      }
    ],
})

var Slack = mongoose.model('Slack', SlackSchema);

module.exports = Slack;
