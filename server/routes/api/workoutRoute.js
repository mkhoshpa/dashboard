/**
 * Created by mehrgankhoshpasand on 2016-12-15.
 */
'use strict';

var reminder = require('../../controllers/api/reminderController.js');
var workout= require('../../controllers/api/workoutController.js');



module.exports = function(app) {


    app.post('/api/workout/create', workout.create);
    app.get('/api/workout/list/:id', workout.list);
    app.post('/api/workout/assign/:id', workout.assign);


};