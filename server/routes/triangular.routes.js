'use strict'
var path = require('path');
var triangular = require('../controllers/triangular.controller.js');

module.exports = function(app) {
  app.get('/triangular', triangular.render);
}
