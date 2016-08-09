module.exports = function (app) {
  var profile = require('../controllers/profile.server.controller');
  app.get('/profile/:id', profile.render);
}
