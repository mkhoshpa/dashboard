'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var messageSchema = new Schema({
  body: {type: String, required: true},
  sentBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  sentTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now},
  //TODO: fix so this isn't necessarry
  sentToPhoneNumber: {type: String}
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
