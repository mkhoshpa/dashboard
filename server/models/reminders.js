var mongoose = require('mongoose');
var Schema = mongoose.schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var reminderSchema = new Schema({
  _id: ObjectId,
  title: {type: String, required: true}
  description: {type: String},
  start: {type: Date, required: true, default: Date.now},
  end: {type, Date, required: true},
  timesOfDay: [String],
  daysOfWeek: [String],
  weeksOfMonth: [Number]
})

var Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
