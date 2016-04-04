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
                this.author = this.userService.get();
                if (this.author.coach) {
                    this.author = this.author.coach.id;
                    console.log('is coach');
                }
                else if (this.author.user) {
                    this.author = this.author.user.id;
                    this.assignee = this.author;
                    console.log('is user');
                    console.log('assignee');
                    console.log(this.assignee);
                }
                if (selected) {
                    console.log(selected);
                    this._id = selected._id,
                        console.log(this._id),
                        this.selectedDays = selected.selectedDates,
                        this.reminder = selected.title,
                        this.time = new Date(selected.timeOfDay);
                }
            }
            ReminderController.prototype.addReminder = function ($event) {
            };
            ReminderController.prototype.editRemidner = function (selected) {
                this.selectedDays = selected.selectedDates,
                    this.reminder = selected.tite,
                    this.time = selected.timeOfDay;
                console.log(selected);
            };
            ReminderController.prototype.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1)
                    list.splice(idx, 1);
                else
                    list.push(item);
            };
            ;
            ReminderController.prototype.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };
            ;
            ReminderController.prototype.toggleAll = function () {
                if (this.selectedDays.length === this.days.length) {
                    this.selectedDays = [];
                }
                else if (this.selectedDays.length === 0 || this.selectedDays.length > 0) {
                    this.selectedDays = this.days.slice(0);
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
                console.log(this.time);
                var dates = {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                };
                if (this.selectedDays.indexOf('Sun') != -1) {
                    dates.sunday = true;
                }
                if (this.selectedDays.indexOf('Mon') != -1) {
                    dates.monday = true;
                }
                if (this.selectedDays.indexOf('Tues') != -1) {
                    dates.tuesday = true;
                }
                if (this.selectedDays.indexOf('Wed') != -1) {
                    dates.wednesday = true;
                }
                if (this.selectedDays.indexOf('Thurs') != -1) {
                    dates.thursday = true;
                }
                if (this.selectedDays.indexOf('Fri') != -1) {
                    dates.friday = true;
                }
                if (this.selectedDays.indexOf('Sat') != -1) {
                    dates.saturday = true;
                }
                var reminder = {
                    _id: this._id,
                    title: this.reminder,
                    timeOfDay: this.time,
                    selectedDates: this.selectedDays,
                    daysOfTheWeek: dates,
                    author: this.author,
                    assignee: this.userService.selectedUser
                };
                console.log('check assingee');
                console.log(reminder.assignee);
                this.$mdDialog.hide(reminder);
            };
            ReminderController.$inject = ['$mdDialog', 'userService', 'selected'];
            return ReminderController;
        }());
        dashboard.ReminderController = ReminderController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=reminderController.js.map