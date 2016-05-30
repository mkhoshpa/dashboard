'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var moment = require('moment');

var surveyTemplateSchema =  new Schema({
  //title: {type: String, required: true},
  title: {type: String, required: true},
  questions: Object,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

var surveyTemplate = mongoose.model('surveyTemplate',surveyTemplateSchema);
module.exports = surveyTemplate;
