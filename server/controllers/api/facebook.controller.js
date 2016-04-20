'use strict'

exports.webhook = function(req, res) {
  if (req.query['hub.verify_token'] === '<validation_token>') {
   res.send(req.query['hub.challenge']);
   }
   res.send('Error, wrong validation token');
}
