'use strict'

var User = require('../../models/user.js');
var request = require('request');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var config = require('../../config/env/development.js');
var winston = require('winston');

exports.connectUser = function (req, res) {
  res.writeHead(302, {
    'Location': 'https://www.facebook.com/dialog/oauth?client_id=' + config.facebook.clientID + '&redirect_uri=http://' + config.server.ip + ':' + config.server.port + '/api/facebook/getclientprofile'
  });
  res.end();
}

exports.getClientProfile = function (req, res) {
  request('https://graph.facebook.com/v2.6/oauth/access_token?client_id=' + config.facebook.clientID + '&redirect_uri=http://' + config.server.ip + ':' + config.server.port + '/api/facebook/getclientprofile&client_secret=' + config.facebook.clientSecret + '&code=' + req.query.code, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      winston.info('Printing body');
      winston.info(body);
      winston.info();
      winston.info(JSON.parse(body).access_token);
      request('https://graph.facebook.com/v2.6/me?access_token=' + JSON.parse(body).access_token, function (err, res, body) {
        winston.info(err);
        //console.log(res);
        winston.info(body);
        var _body = JSON.parse(body);
        request('https://graph.facebook.com/' + JSON.parse(body).id + '/picture/', function (err, res, body) {
          winston.info(res.request.href);
          User.findOneAndUpdate({fullName: _body.name}, {imgUrl: res.request.href}, {new: true}, function (err, user) {
            if (!err) {
              winston.info('User updated successfully');
              winston.info(user);
            } else {
              winston.info('Error');
              winston.info(err);
            }
          })
        });
      });
    }
  });
  res.render('pages/thanks');
}

exports.sendEmail = function (req,res){
  winston.info("Here");

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
          winston.info('no user found');
          req.flash('status', 'No user with that email was found!');
          return res.send('502');
        }
        winston.info("did  i get here!"  + user);

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {

      var transporter = nodemailer.createTransport(mandrillTransport({
        auth: {
          apiKey: config.mandrillApiKey
        }
      }));
      console.log(user.email);

      var mailOptions = {
        to: user.email, //user.username,
        from: 'Willow the Habit Hound <willow@fitpath.me>',
        subject: 'Fitpath.me Profile Generator',
        mandrillOptions: {
          template_name: 'fitpath-welcome-email',
          template_content: {},
          message: {
            merge: true,
            merge_language: 'handlebars',
            global_merge_vars: [{
              name: 'client_name',
              content: user.firstName
            }]
          }
        }
      };

      transporter.sendMail(mailOptions, function(err,info) {
        if(err){
          return winston.info("this is an "+ JSON.stringify(err));
        }
        winston.info('Message sent: ' + info.response);

        req.flash('status', 'An e-mail has been dispatched!');
        done(err, 'done');
      });
    }
    ], function(err) {
      if (err) return next(err);
      //res.send(502);
    });
  res.send({});
};

exports.getProfile = function (req, res) {
  winston.info('User id: ' + req.params.user_id);
  winston.info('Access token: ' + req.params.access_token);
  var options = {
    url: 'https://graph.facebook.com/' + req.params.user_id + '?access_token=' + req.params.access_token,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
    }
  };
  request(options, function (error, response, body) {
    if (!error) {
      winston.info(body);
      var fullName = JSON.parse(body).name;
      winston.info(fullName);
      var splitFullName = fullName.split(' ');
      var newOptions = {
        //  url: 'https://graph.facebook.com/' + req.params.user_id + '/picture/?access_token=' + req.params.access_token,
        url: 'https://graph.facebook.com/' + req.params.user_id + '/picture?type=large',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
        },
      }
      request(newOptions, function (error, response, body) {
          if (!error) {
            winston.info(response.request.uri.href);
            winston.info(body);
            var profilePic = response.request.uri.href;
            var user = {
              firstName: splitFullName[0],
              lastName: splitFullName[1],
              username: fullName,
              provider: 'facebook',
              role: 'user',
              slack_id: fullName,
              slack: {
                id: fullName,
                name: fullName,
                real_name: fullName,
                img: profilePic
              },
              imgUrl: profilePic,
              facebookId: req.params.user_id
            };
            res.send(user);
          }
      });
    }
  });
};
