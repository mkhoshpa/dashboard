'use strict'

exports.webhook = function(req, res) {
  console.log(req.query);
  if (req.query['hub.verify_token'] === 'a_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
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