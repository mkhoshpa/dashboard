'use strict'

var mongoose = require('mongoose');
var user = require('../../models/user.js');


exports.create = function(req, res) {

}

exports.read = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.list = function(req, res) {
  note.find({}, function(err, obj) {
    res.json(obj);
  })
}
