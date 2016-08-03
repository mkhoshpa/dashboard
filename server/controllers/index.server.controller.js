var winston = require('winston');

exports.render = function(req, res) {
  res.render('pages/index.ejs', {
    initialQuestionBoxes: [
      {
        text: 'bitch',
        img: 'dildo.png'
      },
      {
        text: 'bitch2',
        img: 'dildo.png'
      }
    ]
  });
};
