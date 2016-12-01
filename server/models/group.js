'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var groupSchema =  new Schema({
    //title: {type: String, required: true},
    name: {type: String, required: true},
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    memebers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;
/**
 * Created by mehrgankhoshpasand on 2016-11-28.
 */
