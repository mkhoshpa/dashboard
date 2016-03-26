'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var willowSchema = new Schema({
  token: {type: String},
  team_id: {type: String},
  team_domain: {type: String},
  channel_id: {type: String},
  channel_name: {type: String},
  timestamp: {type: String},
  user_id: {type: String},
  user_name: {type: String},
  text: {type: String},
  trigger_word: {type: String}
})

var Willow = mongoose.model('Willow', willowSchema);

module.exports = Willow;
