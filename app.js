// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

var port = 3000;
var db = 'mongodb://admin:admin@ds015919.mlab.com:15919/fitpath-dashboard'
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
})

app.listen(port, function(err) {
  console.log('running server on' + port)
})



console.log(__dirname);
