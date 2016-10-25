'use strict';

var User = require('../models/user.js');
var SurveyTemplate = require('../models/surveyTemplate.js');
var async = require('async');
var crypto = require('crypto');
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var dashboard = require('./dashboard.controller');
var parse = require('csv-parse');
var _ = require('underscore');
var winston = require('winston');
var Reminder = require('../models/reminder.js');
var Response = require('../models/response.js');
var Assignment = require('../models/assignment.js');
var stripe = require("stripe")("sk_test_jCXXYe0fyydEElNMFTXBw7ZL");


/**
  Node Mailer Config
*/

exports.createBio = function(req, res){
  console.log(req.body.body);

  User.findByIdAndUpdate(req.params.id,
  {$set: {"bio": req.body.body}},
  {safe: true},
  function(err, user) {
   if(err) {
     console.log(err);
    }
  });

  res.send(req.body.body);
}

exports.bySlackId = function (req, res) {
  console.log(req.params.id);
  console.log("slack ID");
  User.findOne({slack_id: req.params.id}, function(err, obj){
    if(err){
      console.log("crap");
      console.log(err);
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  });
}



exports.updateMedium = function(req, res){
  console.log(req.body.text);

  User.findByIdAndUpdate(req.params.id,
  {$set: {"defaultCommsMedium": req.body.text}},
  {safe: true},
  function(err, user) {
   if(err) {
     console.log(err);
   } else {console.log("worked");}
  });

  res.send(req.body.text);
}
exports.updateSlackId = function(req, res){
  console.log(req.body);

  User.findByIdAndUpdate(req.params.id,
  {$set: {"slack_id": req.body.text}},
  {safe: true},
  function(err, user) {
   if(err) {
     console.log(err);
    }
  });

  res.send(req.body.text);
};



exports.createPipelineStage = function(req,res){
  console.log("Im here");

  User.findByIdAndUpdate(req.params.id,
  {$set: {"pipelineStage": req.body.body}},
  {safe: true},
  function(err, user) {
   if(err) {
     winston.error(err);
    }
  });

  res.send(req.body.body);

};

exports.createPhoneNumber = function (req, res) {
  User.findByIdAndUpdate(req.params.id,
  {$set: {"phoneNumber": req.body.number}},
  {safe: true},
  function (err, user) {
    if (err) {
      winston.error(err);
    }
  });
  res.send(req.body.number);
};

exports.addSurvey = function(req, res){
  console.log(req.body._id);
  User.findByIdAndUpdate(req.params.id,
  {$push:{"surveyTemplates": req.body._id}},
  {safe:true},
  function(err, user){
    if(err){
      console.log(err);
    }
  });
  res.send(req.body);
};

exports.create = function(req, res) {
  console.log("Im before new User.");
  //console.log(req.body);
  var user = new User(req.body);
  user.provider = 'local';
  user.fullName = user.firstName + ' ' + user.lastName;
  user.pandoraBotSaid = '';
  user.save(function(err) {
    if (err) {
      winston.error(err);
      res.send(err);
    }
    else {
      console.log(user._id);

      console.log("User controller hit");
      console.log(user._id);

        User.findByIdAndUpdate(user.coaches[0],
        {$push: {"clients": user._id}},
        {safe: true},
        function(err, coach) {
          if(err) {
            winston.error(err);
          }
          else {
            console.log('adding user ' + user._id + ' ot coac');
            user.clients.push(user._id);
            console.log('success');
            res.send(user);
          }
        });
      }
    });
  };

exports.updateCoach = function(req, res){
  console.log("Im a coach!");
  var user = new User(req.body);
  console.log('ima a saf');
  res.send(user);
};


exports.render = function(req, res) {

  if (!req.user) {
		// Use the 'response' object to render the signup page
		res.render('pages/signin', {
			// Set the page title variable
			title: 'Sign-up Form',
			// Set the flash message variable
			messages: req.flash('You must be logged In!')
		});
	} else {
		res.render('pages/profile', {
      user: req.user,
      userFullName: req.user ? req.user.fullName : '',
      email: req.user ? req.user.username : '',
      messages: req.flash('success')
    });
	}
}

exports.forgot = function(req, res) {
  res.render('pages/reset', {
    message: req.flash('status')
  });
}

exports.reset = function(req,res,next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          winston.error('no user found');
          req.flash('status', 'No user with that email was found!');
          return res.redirect('/forgot');
        }
        console.log(user);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {

      var transporter = nodemailer.createTransport(
          smtpTransport({
            service: 'gmail',
            auth: {
              user: 'fitpathmailer@gmail.com',
              pass: 'fitpathmail'
            }
          })
      );

      var mailOptions = {
        to: user.username, //user.username,
        from: 'fitpathmailer@gmail.com',
        subject: 'Fitpath.me Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      transporter.sendMail(mailOptions, function(err,info) {
        if(err){
          return winston.error(err);
        }
        console.log('Message sent: ' + info.response);

        req.flash('status', 'An e-mail has been dispatched!');
        done(err, 'done');
      });

    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
}

exports.token = function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
  function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('pages/edit-password', {
      user: user,
      message: req.flash('success', 'Enter in your new password!')
    });
  });
}

exports.change = function(req, res) {
  async.waterfall([
     function(done) {
       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
         if (!user) {
           req.flash('error', 'Password reset token is invalid or has expired.');
           return res.redirect('back');
         }
         user.password = req.body.confirm;
         user.resetPasswordToken = undefined;
         user.resetPasswordExpires = undefined;

         user.save(function(err) {
           req.logIn(user, function(err) {
             done(err, user);
           });
         });
       });
     },
   ], function(err) {
     res.redirect('/');
   });
}

exports.update = function(req,res) {
  console.log("hit  "+ JSON.stringify(req.body));
  //if(!req.user) {
    // Use the 'response' object to render the signup page
    //res.render('pages/signin', {
      // Set the page title variable
     // title: 'Sign-up Form',
      // Set the flash message variable
     // messages: req.flash('You must be logged In!')
   // });
 // } else {

   // res.redirect('/');
  //}
  User.findByIdAndUpdate(req.body._id,
      {$set:req.body},
      {safe: true},
      function (err, user) {
        if (err) {
          winston.error(err);
        }
        else{
          console.log(user);
        }
      });
  res.send(req.body);
};

exports.delete = function(req, res){
  User.findOneAndRemove({_id: req.params.id}, function (err, obj) {
    if (!err) {
      console.log(obj);
      Reminder.findOneAndRemove({assignee: req.params.id}, function(err, reminders){
        if(err){
          console.log(err);
        }
        else{
          console.log(reminders);


              }
            });

      Assignment.findOneAndRemove({userId: req.params.id }, function(err, assignments){
        if(err){
          console.log(err);

        }
        else{
          console.log(assignments);
        }
      });
      Response.findOneAndRemove({userId: req.params.id }, function(err, responses){
        if(err){
          console.log(err);

        }
        else{
          console.log(responses);
        }
      });






      User.findOne({_id:obj.coaches[0] }, function(err, obj1) {
        if (err || obj1== null) {
          console.log("Failed to find the coach");
          res.sendStatus(500);
        }
        else {
          var clients = obj1.clients;

          clients.splice(clients.indexOf(req.params.id),1);
          User.findOneAndUpdate({_id: obj1._id},{clients: clients} , function (err, obj) {
            if(!err){
              res.json(obj);
            }else{
              res.send(err);
            }
          })


        }
      });

    } else {
      console.log('Failed to delete user: ' + JSON.stringify(obj));
      res.send(500);
    }
  });
};

exports.getUser = function(req,res){
  console.log("getUser");
  console.log(req.params.id);
  User.findOne({_id: req.params.id}, function(err, obj){
    if(err){
      console.log("crap");
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  });
}

exports.parseCSV = function (req, res) {
  console.log(req.body.textToParse);
  parse(req.body.textToParse, function (err, output) {
    console.log(JSON.stringify(output));
    res.send(output);
  });
}

  exports.unsub= function (req, res) {
    console.log("unsub");
    console.log(req.params.id);
    User.findOne({_id: req.params.id}, function(err, obj) {
      if (err) {
        console.log("crap");
        res.send(500);

      }
      else {
        console.log(obj);
        var sub = obj.subscription;
        stripe.subscriptions.del(
            sub,
            {at_period_end: true},
            function (err, confirmation) {
              // asynchronously called
              if(!err) {
                console.log("confirmation");
                console.log(confirmation);
                var willBeCharged = false;
                User.findOneAndUpdate({_id: req.params.id}, {willBeCharged: willBeCharged}, function (err, obj1) {
                  if (err) {
                    console.log("crap1");
                    res.send(500);
                  }
                  else {
                    res.send(obj1)
                  }


                });
              }
              else{
                console.log("stripe err");
                res.send(500);

              }

            });

      }
    });



  };


exports.sub= function (req, res) {
  console.log("sub");
  //console.log(req.params.id);
  console.log(req.body);
  User.findOne({_id: req.body.userId}, function(err, obj) {
    if (err) {
      console.log("crap");
      res.send(500);

    }
    else {
      console.log(obj);
      var cus = obj.stripeId;
      stripe.subscriptions.create({
            customer: cus,
            plan: req.body.plan
          }, function(err, subscription) {
            // asynchronously called

        if(!err) {
          console.log("confirmation");
          console.log(subscription);
          var willBeCharged = true;
          var active_until = new Date(subscription.current_period_end*1000);
          var subs = subscription.id;
          console.log(subscription.current_period_end);
          console.log(active_until);
          User.findOneAndUpdate({_id: req.body.userId}, {subscription: subs, willBeCharged: willBeCharged , active_until: active_until}, function (err, obj1) {
            if (err) {
              console.log("crap1");
              res.send(500);
            }
            else {
              res.send(obj1)
            }


          });
        }
        else{
          console.log("stripe err");
          res.send(500);

        }

          }
      );

    }
  });



};
exports.resub= function (req, res) {
  console.log("resub");
  //console.log(req.params.id);
  console.log(req.body);
  User.findOne({_id: req.body.userId}, function(err, obj) {
    if (err) {
      console.log("crap");
      res.send(500);

    }
    else {
      console.log(obj);
      var subss = obj.subscription;
      stripe.subscriptions.update(
           subss,
          {plan: req.body.plan
          }, function(err, subscription) {
            // asynchronously called

            if(!err) {
              console.log("confirmation");
              console.log(subscription);
              var willBeCharged =!subscription.cancel_at_period_end;
              var active_until = new Date(subscription.current_period_end*1000);
              console.log(subscription.current_period_end);
              console.log(active_until);
              User.findOneAndUpdate({_id: req.body.userId}, {willBeCharged: willBeCharged , active_until: active_until}, function (err, obj1) {
                if (err) {
                  console.log("crap1");
                  res.send(500);
                }
                else {
                  res.send(obj1)
                }


              });
            }
            else{
              console.log(err);
              console.log("stripe err");
              res.send(500);

            }

          }
      );

    }
  });



};