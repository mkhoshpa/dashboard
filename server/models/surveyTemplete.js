'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var moment = require('moment');

var SurveyTempleteSchema =  new Schema({
  //title: {type: String, required: true},
  title: {type: String, required: true},
  questions: [{
    type: Object
  }],
  
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});

var SurveyTemplete = mongoose.model('SurveyTemplete',SurveyTempleteSchema);
module.exports = SurveyTemplete;
