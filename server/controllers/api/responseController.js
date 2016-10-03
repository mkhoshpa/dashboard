'use strict';

var User = require('../../models/user.js'),
Response = require('../../models/response.js');
var winston = require('winston');

exports.create = function(req, res) {
  var response = new Response(req.body);
  console.log("response controller");
  console.log(JSON.stringify(response));
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
