'use strict'

var twilio = require('twilio')('ACf83693e222a7ade08080159c4871c9e3', '20b36bd42a33cd249e0079a6a1e8e0dd');
var twiml = require('twilio');

exports.sendSMS = function (req, res) {
  console.log('Begin sendSMS');
  console.log(req.body);
  twilio.sendMessage({
    to: '+15064261732',//req.params.number,
    from: '+12898062194',
    body: req.body.message,
  }, function (err, responseData) {
    if (!err) {
      console.log('Message successfully sent.');
      // console.log(responseData.from);
      // console.log(responseData.body);
    }
  })
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Success\n');
}

exports.receiveSMS = function (req, res) {
  console.log('Begin receiveSMS');
  var resp = new twiml.TwimlResponse();
  resp.message('You replied: ' + req.body.Body);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  console.log("The client responsed with: " + req.body.Body);
  console.log(JSON.stringify(req.body));
  res.end(resp.toString());
}
