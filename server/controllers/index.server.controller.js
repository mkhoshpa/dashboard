var winston = require('winston');

exports.render = function(req, res) {
  res.render('pages/index.ejs', {
    initialText: 'Congrats, you\'re here.',
    initialQuestionBoxes: [
      {
        text: 'Tell us why?',
        options: [
          {
            text: 'I want to lose weight',
            img: 'loseweight.png'
          },
          {
            text: 'I want more energy',
            img: 'moreenergy.png'
          },
          {
            text: 'I want less stress',
            img: 'lessstress.png'
          },
          {
            text: 'That all sounds great',
            img: 'all.png'
          }
        ],
        // Possibly an image associated with each dropdown menu?
        img: 'dildo.png'
      },
      {
        text: 'What do you want to do?',
        options: [
          {
            text: 'Eat less junk food',
            img: 'lessjunk.png'
          },
          {
            text: 'Start meditating',
            img: 'meditate.png'
          }
        ],
        img: 'dildo.png'
      },
      {
        text: 'What\'s your next step?',
        options: [
          {
            text: 'Eat less than one bowl of chips a week',
            img: 'lesschips.png'
          },
          {
            text: 'Meditate for 5 minutes each day',
            img: 'meditate.png'
          }
        ],
        img: 'dildo.png'
      }
    ]
  });
};
