var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surveyResponseSchema = new Schema({
  from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  response: {type: String},
  timeStamp: {type: Date, default: Date.now}
});

var SurveyResponse = mongoose.model('SurveyResponse', SurveyResponseSchema);

module.exports = SurveyResponse;
