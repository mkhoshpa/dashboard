var winston = require('winston');
var sendmail = require('sendmail')();


exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  console.log(JSON.stringify(req.user));
  req.session.lastVisit = new Date();
  res.render('pages/new/index', {
    userName: req.user ? req.user.slack.real_name : '',
    userFullName: req.user ? req.user.fullName : '',
      message:'',
    email: req.user ? req.user.username : ''
  });
}

exports.renderContactUs = function(req, res) {

  res.render('pages/contactUs');
}
  exports.contact=function (req,res) {
    var from = req.body.email;
    var html = req.body.text;
    sendmail({
      from: 'no-reply@fitpath.tech',
      to: 'mkhoshpa@unb.ca',
      subject: 'from:'+from,
      html: html,
    }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);

    });
    return res.redirect('/');


  }

