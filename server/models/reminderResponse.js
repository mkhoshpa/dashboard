'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reminderResponseSchema = new Schema({

  response:[{
    text: {type: String},
    time: {type: Date}
  }],
  createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  responded:{type:Boolean, default:'false'},
  reminder:{type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'},
  timeStamp: {type: Date, default: Date.now}
});

reminderResponseSchema.post('save', function(doc,next) {
  // Push blank response onto ref'd reminder
  mongoose.model('Reminder').findByIdAndUpdate(
    this.reminder,
    {
      $push: {"responses":this._id}
    },
    {new: true},
    function(err, reminder) {
      var length = reminder.responses.length;
      // Subtract

      if(reminder.increment())
        // Set Adjust User Status Point
        mongoose.model('User').findByIdAndUpdate(
          reminder.assignee,
          {
            $inc: {"status.value": 1}
          }
        )

      else if(reminder.decrement()){
        mongoose.model('User').findByIdAndUpdate(
          reminder.assignee,
          {
            $inc: {"status.value": -1}
          }
        )
      }
    }
  );
  next();
});


// Update User with most recent response and update thier status
reminderResponseSchema.post('findOneAndUpdate', function() {
  console.log(this);
  // Find User, set response as most recent, then update status

  // Update Status
});

var ReminderResponse = mongoose.model('ReminderResponse', reminderResponseSchema);

module.exports = ReminderResponse;
