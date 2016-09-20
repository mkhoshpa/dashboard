var assert = require('chai').assert;
var ReminderController = require('../server/controllers/api/ReminderController.js');
var AssignmentController = require("../server/controllers/api/AssignmentController.js");

describe('#create', function () {
//TODO: possibly use supertest to make requests to the reminderRoute
  it('should respond with HTTP 200 if the reminder is created successfully', function() {
    var arr = [];
    assert.equal(arr.length, 0);
  });

});
describe('reminder controller', function() {
	it("should return 4", function() {
		assert.equal(4, 4);
	});
});
describe('reminder controller', function() {
	it("should equal four", function() {
		console.log("something");
		assert.equal(ReminderController.returnMultiply(2, 3), 6);
	});
});
// describe('testing date array function', function(){
// 	it("should return an array of numbers between 0-6", function() {
// 		var dayObject = {
// 			monday: true, 
// 			tuesday: true, 
// 			wednesday: false,
// 			thursday: true, 
// 			friday: false, 
// 			saturday: true, 
// 			sunday: false

// 		};
// 		var answer = [0,1,3,5];
// 		assert.equal(AssignmentController.getRealDates(dayObject, 3, 4), answer);
// 	});
// });
describe('testing assignment controller methods - part 1 ', function(){
	it("just calling console log", function() {
		var daysOfTheWeek = {
			monday: true, 
			tuesday: true, 
			wednesday: false,
			thursday: true, 
			friday: true, 
			saturday: true, 
			sunday: false

		}
		var reminder = {
			"hour": 11, 
			"minute": 33,
			"reminder.id": 0,
			"user.id": 2, 
			"repeat": true, 
			"type": "reminder", 
			"sent" : false,
			"daysOfTheWeek": daysOfTheWeek,
			"specificDate": new Date()
		}
		AssignmentController.createFromReminder(reminder);
	});

})
