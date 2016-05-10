'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var noteSchema =  new Schema({
  //title: {type: String, required: true},
  description: {type: String, required: true},
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
