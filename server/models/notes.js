var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var noteSchema =  new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  user: {type: }

})
