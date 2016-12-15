/**
 * Created by mehrgankhoshpasand on 2016-12-15.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var workoutSchema =  new Schema({
    //title: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    day: [{}]
});

var Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
