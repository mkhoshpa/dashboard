'use strict'

var User 		 = require('mongoose').model('User'),
    SurveyTemplate = require('mongoose').model('SurveyTemplate'),
    Reminder = require('mongoose').model('Reminder'),
    ReminderResponse = require('mongoose').model('ReminderResponse'),
    path     = require('path'),
		passport = require('passport');

exports.render = function(req, res, next) {
  if (req.user) {
    if(req.user.role == "coach") {

      var populateCoach = [
        {
          path: 'clients',
          model: 'User',
          // populate: {
          //   path: 'surveyTemplates',
          //   model: 'SurveyTemplate',
          //   /*populate: {
          //     path: 'responses',
          //     model: 'ReminderResponse'
          //   }*/
          // }
        },
        // {
        //   path: 'clients',
        //   model: 'User',
        //   populate: {
        //     path: 'mostRecentResponse',
        //     model: 'ReminderResponse',
        //   }
        // },
        // {
        //   path: 'clients',
        //   model: 'User',
        //   populate: {
        //     path: 'surveys',
        //     model: 'Survey',
        //     populate: {
        //       path: 'goals',
        //       populate: {
        //         path: 'reminder',
        //         model: 'Reminder'
        //       }
        //     }
        //   }
        // },
        // {
        //   path: 'mostRecentResponse'
        // },
        {
          path: 'surveyTemplates',
          model: 'SurveyTemplate'
        }
        // },
        // {
        //   path: 'reminders'
        // }
      ]
      console.log(req.user);
      console.log('User.populate');
      User.populate(req.user, populateCoach,
        function(err, user) {
        if(user) {
          console.log(user.clients.length);
          console.log(user.clients);
          console.log('populate dashboard2');

          // for(var i = 0; i < user.clients.length; i++) {
          //   user.clients[i].calcStatus();
          // }

          res.render(path.resolve('app/index'), {
            user: JSON.stringify(user)
          });
        }
        else {
          console.log('ERROR LOADING DASHBOARD FOR SOME ODD REASON');
          res.render('landing', {
      			// Set the page title variable
      			title: 'Fitpath',
      			// Set the flash message variable
      			messages: req.flash('There was an error loading clients')
      		});
        }
      });
      console.log("after:");

    } else if (req.user.role == "user")  {

      var populateClient = [
        {
          path: 'reminders',
          model: 'Reminder',
          populate: {
            path: 'responses',
            model: 'ReminderResponse'
          }
        },
        {
          path: 'surveys',
          model: 'Survey',
          populate: {
            path: 'goals',
            populate: {
              path: 'reminder',
              model: 'Reminder'
            }
          }
        }
      ]
      console.log("where am I?");
      User.populate(req.user,
        populateClient, function(err, user) {
          if(user) {
            res.render(path.resolve('app/index'), {
              user: JSON.stringify(user)
            });
          }
          else {
            res.render('landing', {
              // Set the page title variable
              title: 'Fitpath',
              // Set the flash message variable
              messages: req.flash('There was an error loading clients')
            });
          }
        });
    }
  } else {
    //req.session.returnTo = req.path;
		return res.redirect('/signin');
	}
}
