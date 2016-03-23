'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var surveySchema = new Schema({
  _id: ObjectId,
  title: {type: String, required: true },
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  start: { type: Date, default: Date.now },
  end: Date,
  questions: [
    question: {type: String},
    response: {type: String}
  ]
})

var Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
