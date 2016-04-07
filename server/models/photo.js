'use strict'

var mongooose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var photoSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // Uploaded image vs. Url Reference
  image: {type : JSON},
  imageUrl: {type: String}
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
