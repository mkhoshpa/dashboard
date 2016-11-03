'use strict';

var Message = require('../../models/message.js');
var User = require('../../models/user.js');
var Reminder = require('../../models/reminder.js');
var _ = require('underscore');
var config = require('../../config/env/development.js');
var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');
var config = require('../../config/env/development.js');
var winston = require('winston');
var async =require('async');
var io = require('socket.io')(28104);
var MessageController = require('./messageController.js');


console.log('listening for websocket connections on *:' + config.messageSocketPort);

// a list of currently connected sockets
var sockets = [];

io.on('connection', function (socket) {
  console.log('A user connected');
  sockets.push(socket);
  socket.on('disconnect', function () {
    console.log('User disconnected');
    sockets = _.without(sockets, socket);
  });
});
exports.addClient = function (message, callback) {
  console.log("inside addClient");
  User.findOne({_id: message.sentTo}, function(err, obj) {
    if (err) {
      callback(error);
    }
    else {
      if(obj != null) {
        // console.log('find a ckient////////////////////////////////////////////////////////////////////');
        //console.log(assignments);
        var reminder = {title: message.body};
        var assignment = {specificDate: message.created, date: message.created};
        var object = {client: obj, reminder: reminder, assignment: assignment}
        callback(null, object);
      }
      else{
        User.findOne({_id: message.sentBy}, function(err, obj) {
          if (err) {
            callback(error);
          }
          else {
            var reminder = {title: message.body};
            var assignment = {specificDate: message.created, date: message.created};
            var object = {client: obj, reminder: reminder, assignment: assignment}
            callback(null, object);

          }
        });
        }



    }
  })
}
exports.getClient = function (client, callback) {
  console.log("inside getClient");
  User.findOne({_id: client}, function(err, obj) {
    if (err) {
      callback(error);
    }
    else {
      // console.log('find a ckient////////////////////////////////////////////////////////////////////');
      //console.log(assignments);
      callback(null ,obj);

    }
  })
}
exports.findByCoach = function (req, res) {
  var finalMessages = [];


  User.findOne({_id: req.params.id}, function (err, obj) {
    if (err) {
      console.log("crap");
      res.send(err);
    }
    else {
      //console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkk");
      //console.log(obj);
      var coach = obj;

      var clients = coach.clients;
      var finalClients = [];
      async.map(clients, MessageController.getClient, function (err, results) {
        if (err) {
          res.send(err);

        }
        else {

          // finalClients = results;
          for (var i = 0; i < results.length; i++) {
            if (results[i] != null) {
              finalClients.push(results[i]);
              // console.log(results[i]);

            }

          }
          finalClients.forEach(function (client) {
            finalMessages = finalMessages.concat(client.messages);
          })
          console.log("messssssaaagesssssssssssssssssssssssssssssssss");
          //console.log(finalMessages);
          //res.send(finalMessages);
          async.map(finalMessages, MessageController.addClient, function (err, results) {
           console.log(results);
           res.send(results);
           })
        }
      });


    }
  })
}

exports.sendSMS = function (req, res) {
  var message = new Message(req.body);
  console.log('Begin sendSMS');

  message.save(function(err, message) {
    if (!err) {
      console.log("Message saved.");
      console.log('Message is: ' + JSON.stringify(message));
      User.findByIdAndUpdate(
        ""+message.sentTo,
        {$push: {"messages": message}},
        {safe: true},
        function(err, user) {
          if (err) {
            console.log("ERROR!!!!!!");
            console.log(err);
          } else {
            console.log('Message pushed to user');
            console.log('User is ' + JSON.stringify(user));
            var sentToPhoneNumber = '';
            User.findById(""+message.sentTo, function (err, userSentTo) {
              if (!err) {
                console.log("MESSAGE SENT ");

                twilio.sendMessage({
                  to: userSentTo.phoneNumber,
                  from: config.phoneNumbers.messages,
                  body: message.body
                }, function (err, responseData) {
                  if (!err) {
                    console.log(JSON.stringify(responseData));
                  }
                });
              }
            });
          }
        }
      )
      res.send(message);
    }
  });
}

exports.receiveSMS = function (req, res) {
  console.log('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  console.log('Received SMS from: ' + req.body.From);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client wrote: " + req.body.Body);
  console.log('req.body.From is: ' + req.body.From);

  // Find user by phone num and actually create valid message object
  User.findOne({phoneNumber: req.body.From}, function (err, user) {
    console.log("inside finde");
    if (user == null) {
      var phone =req.body.From.substring(1);
      console.log(phone);
      console.log("inside else");

      User.findOne({phoneNumber: phone}, function (err, user) {

        console.log('User else is: ' + JSON.stringify(user));
        if (user == null) {
          var phone = req.body.From.substring(2);


          User.findOne({phoneNumber: phone}, function (err, user) {

            console.log('User else else is: ' + JSON.stringify(user));


              console.log('We should be adding a message');
              var message = new Message({
                body: req.body.Body,
                sentBy: user._id,
                sentTo: '5741ef7c5254295828d8c3b0'
              });
              User.findOneAndUpdate(
                  {phoneNumber: phone},
                  {$push: {messages: message}},
                  {safe: true},
                  function (err, user) {
                    if (!err) {
                      console.log('The user with that phone number is: ' + user.fullName);
                      io.emit('message', message);
                      console.log('Message saved and pushed to user');
                    } else if (err) {
                      console.log("there is no user with that name");

                    }

                  });


          });




        }else {

          console.log('We should be adding a message');
          var message = new Message({
            body: req.body.Body,
            sentBy: user._id,
            sentTo: '5741ef7c5254295828d8c3b0'
          });
          User.findOneAndUpdate(
              {phoneNumber: phone},
              {$push: {messages: message}},
              {safe: true},
              function (err, user) {
                if (!err) {
                  console.log('The user with that phone number is: ' + user.fullName);
                  io.emit('message', message);
                  console.log('Message saved and pushed to user');
                } else if (err) {
                  console.log("there is no user with that name");

                }

              });

        }
      });


    }

    else {

      console.log('User is: ' + JSON.stringify(user));
      console.log('We should be adding a message');
      var message = new Message({
        body: req.body.Body,
        sentBy: user._id,
        sentTo: '5741ef7c5254295828d8c3b0'
      });
      User.findOneAndUpdate(
          {phoneNumber: req.body.From},
          {$push: {messages: message}},
          {safe: true},
          function (err, user) {
            if (!err) {
              console.log('The user with that phone number is: ' + user.fullName);
              io.emit('message', message);
              console.log('Message saved and pushed to user');
            } else if (err) {
              console.log("there is no user with that name");

            }

          });

    }
    res.end(resp.toString());

  });
}
