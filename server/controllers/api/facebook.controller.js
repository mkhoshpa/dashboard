'use strict'
var request = require('request');
var cheerio = require('cheerio');

exports.webhook = function(req, res) {
  console.log(req.query);
  if (req.query['hub.verify_token'] === 'a_token') {
    res.send(req.query['hub.challenge']);
  }
}

exports.recieve = function(req, res) {
  console.log(req.body);
  var messaging_events = req.body.entry[0].messaging;
  console.log(messaging_events);
  for (var i = 0; i < messaging_events.length - 1; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
}

exports.send = function(req, res) {

}

exports.echo = function(req,res) {
  var token = "EAAOJsBYKnd8BAPT6ZCIcnqR3hFfk5rg8zS2laSfx6MLjU71xouZAE2ZBuZBHQZBgdoOW4sAJRRx8z0ZCQxvqKUXtGT6EH0ZCZCqSdOGNCs7AUxn1z80No85OfWo0nP73PoiTRjiRn66yN67XjHvRHrMKPF3DwIYjoq26UD1EUfTYCAZDZD";
  var messaging_events = req.body.entry[0].messaging;
  console.log(req.body.entry.length);



  // for (var i = 0; i < messaging_events.length; i++) {
  //   var event = req.body.entry[0].messaging[i];
  //   var sender = event.sender.id;
  //   if (event.message && event.message.text) {
  //     var text = event.message.text;
  //     sendTextMessage(sender,text);
  //   }
  // }



  function sendTextMessage(sender, text) {
    var messageData = {
      text:text
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
}

exports.getProfile = function (req, res) {
  console.log('User id: ' + req.params.user_id);
  console.log('Access token: ' + req.params.access_token);
  var options = {
    url: 'https://graph.facebook.com/' + req.params.user_id + '?access_token=' + req.params.access_token,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
    }
  };
  request(options, function (error, response, body) {
    if (!error) {
      console.log(body);
      var fullName = JSON.parse(body).name;
      console.log(fullName);
      var splitFullName = fullName.split(' ');
      var newOptions = {
        url: 'https://graph.facebook.com/' + req.params.user_id + '/picture/?access_token=' + req.params.access_token,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36'
        }
      }
      request(newOptions, function (error, response, body) {
          if (!error) {
            console.log(response.request.uri.href);
            console.log(body);
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
