'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var Surveys = require('./surveys.js');
var Reminders = require('./reminders.js');

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
    surveys: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Surveys'}
    ],
    reminders: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Reminders'}
    ]
})

var Slack = mongoose.model('Slack', SlackSchema);

module.exports = Slack;
