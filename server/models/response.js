'use strict';
//not used
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var amqp = require('amqplib/callback_api');

//response schema is super dumb and doesn't figure out status by itself -
//might not be a bad idea to make a status model actually



var responseSchema = new Schema({

  type: {
    type: String,
    enum: ['reminder', 'survey'],
    default: 'reminder'},



  //TODO get populate to work
  timeStamp: {type: Date, default: Date.now},
  assignment: {type: mongoose.Schema.Types.Object, ref: 'Assignment'},
  userId: {type: mongoose.Schema.Types.Object, ref: 'User'},

  surveyTemplateId: {type: mongoose.Schema.Types.Object, ref: 'SurveyTemplate'},

  //questions create a local copy of questions asked, in case survey template gets dropped or changed

  questions: [

    {
      question:{type: String, required: true},
      header: {type: String, required: true},
      type: {
        type: String,
        enum: ['YESNO', 'SCALE', 'WRITTEN'],
      },
      answer: {type: String, default: "something is broke"}
     },
  ],
  reminderId: {type: mongoose.Schema.Types.Object, ref: 'Reminder'}

});

responseSchema.post('save', function (response) {
  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, channel) {
      var queue = 'responses';

      ch.assertQueue(queue, {durable: true});
      // new Buffer(JSON.stringify(response.toObject())) converts the document from mongodb to a buffer
      ch.sendToQueue(queue, new Buffer(JSON.stringify(response.toObject())), {persistent: true});
    });
  });
});

var Response = mongoose.model('Response', responseSchema);

module.exports = Response;
