/**
 * Created by mehrgankhoshpasand on 2016-12-20.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./user.js');

var newsLetterSchema =  new Schema({
    //title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    clients: [{}],
    title: {type: String, required: true},
    time:{type: Date},
    date:{type: Date}


});

var NewsLetter= mongoose.model('NewsLetter', newsLetterSchema);
module.exports = NewsLetter;
