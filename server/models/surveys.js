var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var surveySchema = new Schema({
  _id: ObjectId,
  title: {type: String, required: true },
  author: {type: String, required: true },
  user: {type: String, required: true },
  start: { type: Date, default: Date.now },
  end: Date,
  questions: [
    question: {type: String},
    response: {type: String}
  ]
})

var Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
