exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();
  console.log(__dirname);
  res.render('pages/landing', {
    userFullName: req.user ? req.user.fullName : ''
  });
};
