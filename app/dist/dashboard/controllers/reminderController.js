/// <reference path="../_all.ts" />
//commentss
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var ReminderController = (function () {
            function ReminderController($mdDialog, userService, selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.selected = selected;
                this.response = "";
                this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                this.selectedDays = [];
                this.repeat = false;
                this.author = this.userService.get();
                if (this.author.role == "coach") {
                    this.author = this.author.id;
                    this.assignee = this.userService.selectedUser;
                    this.assignee = this.assignee._id;
                }
                else if (this.author.role == "user") {
                    this.author = this.author.id;
                    this.assignee = this.author;
                }
                if (selected) {
                    this._id = selected._id,
                        this.selectedDays = selected.selectedDates,
                        this.reminder = selected.title,
                        this.responses = selected.responses,
                        this.time = new Date();
                        this.time.setMinutes(selected.minute);
                        this.time.setHours(selected.hour);
                        this.time.setMilliseconds(0);
                        this.time.setSeconds(0);
                    this.repeat = selected.repeat;
                }
            }
            // selectedDays reminder
            ReminderController.prototype.toggle = function (item, list) {
                var idx =  this.days.indexOf(item);
                idx=idx+"";
                var index = list.indexOf(idx);
                if(index === -1){
                    this.selectedDays.push(idx);

                }
                else{
                    this.selectedDays.splice(index,1);
                }
            }


            ReminderController.prototype.exists = function (item, list) {

                var index =  this.days.indexOf(item);
                var answer = false;
                for (var i = 0; i < list.length; i++) {
                    if(index == list[i]){
                        answer = true;
                    }
                }
                return answer;
            };
            ;
            ReminderController.prototype.toggleAll = function () {
                if (this.selectedDays.length === this.days.length) {
                    this.selectedDays = [];
                }
                else if (this.selectedDays.length === 0 || this.selectedDays.length > 0) {
                    this.selectedDays = [0,1,2,3,4,5,6];
                }
            };
            ;
            ReminderController.prototype.isChecked = function () {
                return this.selectedDays.length === this.days.length;
            };
            ;
            ReminderController.prototype.isIndeterminate = function () {
                return (this.selectedDays.length !== 0 &&
                    this.selectedDays.length !== this.days.length);
            };
            ;
            ReminderController.prototype.select = function () {
            };
            ReminderController.prototype.close = function () {
                this.$mdDialog.cancel();
            };


            ReminderController.prototype.save = function () {
                //console.log("r" + this.selected);
                //console.log("hello select: " +this.selected.responses);
                //console.log(this.time);
                var dates = {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                };

                var days = [];
                var hour = this.time.getHours();
                var minute = this.time.getMinutes();
                var day = this.time.getDay();
                console.log(this.time);
                console.log(day);

                var dateToday = new Date();
                dateToday.setHours(hour);
                dateToday.setMinutes(minute);
                dateToday.setSeconds('00');
                //dateToday.set
                console.log("today date")

                console.log(dateToday);





                if (this.selectedDays.indexOf('Sun') != -1) {
                    dates.sunday = true;
                    days.splice(this.days.length,0,0);
                }
                if (this.selectedDays.indexOf('Mon') != -1) {
                    dates.monday = true;
                    days.splice(this.days.length,0,1);
                }
                if (this.selectedDays.indexOf('Tues') != -1) {
                    dates.tuesday = true;
                    days.splice(this.days.length,0,2);
                }
                if (this.selectedDays.indexOf('Wed') != -1) {
                    dates.wednesday = true;
                    days.splice(this.days.length,0,3);
                }
                if (this.selectedDays.indexOf('Thurs') != -1) {
                    dates.thursday = true;
                    days.splice(this.days.length,0,4);
                }
                if (this.selectedDays.indexOf('Fri') != -1) {
                    dates.friday = true;
                    days.splice(this.days.length,0,5);
                }
                if (this.selectedDays.indexOf('Sat') != -1) {
                    dates.saturday = true;
                    days.splice(this.days.length,0,6);
                }
                var object = {
                    _id: this._id,
                    title: this.reminder,
                    days: days,
                    repeat: this.repeat,
                    // Will this be set to server time or user's local time?
                    //toLocaleTimeString(),
                    timeOfDay: dateToday,
                    hour: hour,
                    minute: minute,
                    // array of numbers from 0 to 6 that shows days that we should creat  assignments
                    selectedDates: this.selectedDays,
                    daysOfTheWeek: dates,
                    author: this.author,
                    assignee: this.assignee,
                    responses: this.responses

                };
                console.log(this.time);
                console.log('check time');
                console.log(object.timeOfDay);
                console.log('check assingee');
                console.log(object);

                //console.log(reminder);
                this.$mdDialog.hide(object);
            };
            ReminderController.$inject = ['$mdDialog', 'userService', 'selected'];
            return ReminderController;
        }());
        dashboard.ReminderController = ReminderController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=reminderController.js.map
