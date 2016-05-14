'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');




var bioSchema = new Schema({

  body:{type: String},

  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Bio = mongoose.model('Bio', bioSchema);

module.exports = Note;
