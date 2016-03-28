'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var willowSurveySchema = new Schema({
  responses: {
    init: {type: String},
    mood: {type: String},
    sleep: {type: String},
    anxiety: {type: String},
    self_care: {type: String},
    questions: {type: String}
  },
  user: {type: String},
  date: {type: String}
})

var WillowSurvey = mongoose.model('WillowSurvey', willowSurveySchema);

module.exports = WillowSurvey;
