'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var habitSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  author: {type: String},
  authorRef: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
