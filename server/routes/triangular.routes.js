'use strict'
var path = require('path');
var triangular = require('../controllers/triangular.controller.js');

module.exports = function(app) {
  app.get('/triangular', function(req, res) {
    res.render(path.resolve('app/dist/triangular/index'));
  });
}
