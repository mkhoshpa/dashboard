'use strict';

var message = require('../../controllers/api/messageController.js');

module.exports = function (app) {
  app.post('/api/message/receive', message.receiveSMS);
  app.post('/api/message/send/:number/:message', message.sendSMS);
}
