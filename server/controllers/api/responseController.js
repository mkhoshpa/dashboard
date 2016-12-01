'use strict';

var User = require('../../models/user.js'),
Response = require('../../models/response.js');
var winston = require('winston');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var config = require('../../config/env/development.js');


exports.create = function(req, res) {
  var response = new Response(req.body);
  console.log("response controller");
  console.log(JSON.stringify(response));
  User.findOne({_id:response.userId},function(err,user){
    if(!err) {
        var coachId = user.coaches[0];
        User.findOne({_id: coachId}, function (err, coach) {
          if(!err){
            if(coach.phoneNumber){

              twilio.sendMessage({
                  to: coach.phoneNumber,
                  from: config.phoneNumbers.messages,
                  body: 'you got a message from '+user.username+' on fitpath'
              }, function (err, responseData) {
                  if (!err) {
                      console.log(JSON.stringify(responseData));
                  }
              });
            }

          }
        });
    }
      });
  response.save(function(err, response){

    if(err){
      console.log(err);
    }
    else{
      res.send({});
    }
  });

};

exports.read = function(req, res) {

};

exports.update = function(req, res) {
  var response = new Response(req.body);
  console.log("response controller");
  console.log(JSON.stringify(response));
  response.save(function(err, response){

    if(err){
      console.log(err);
    }
    else{
      res.send(response);
    }
  });
};

exports.delete = function(req, res) {
 Response.remove({_id: req.params.id}, function (err){
    if(!err){
      console.log("response should be goine now");
      res.send("we did");
    }else {
      res.sendStatus(500);
    }
  });
};

exports.list = function(req, res) {
  Response.find({assignment: req.params.id, type: 'reminder'}, function(err, obj) {
    res.json(obj);

  })
}

exports.selectedByAssignment = function (req, res) {
  console.log("selectedByAssignment");
  Response.find({assignment: req.params.id}, function (err, obj) {
    if(err){
      console.log("crap");
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  })
}
