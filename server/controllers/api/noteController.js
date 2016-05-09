'use strict'

var mongoose = require('mongoose');
var Note = require('../../models/note.js');


exports.create = function(req, res) {
  var note = new Note(req.body);
  console.log("note controller hit");
  console.log(note);

  res.send(note);

}

exports.read = function(req, res) {

}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {

}
