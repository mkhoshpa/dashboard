'use strict';

module.exports = function(app, client) {

  app.get('/twilio', function(req, res) {
    client.sendMessage({
      to: '',
      from: '+14153845350',
      body: 'Hello World!'
    }, function(err, data) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(data);
      }
    })
  });

  app.post('/twilio', function(req, res) {

  })

}
