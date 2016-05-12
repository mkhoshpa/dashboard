'use strict'

var mongoose = require('mongoose');
///create a bio.js or change as bio for right now is only a string.
var Bio = require('../../models/bio.js');


exports.create = function(req, res) {
  //change
  var bio= new Bio(req.body);
  console.log("bio controller hit");
  console.log(bio);

  res.send(bio);

}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {

}
