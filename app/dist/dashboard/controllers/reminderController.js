var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var ReminderController = (function () {
            function ReminderController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.response = "";
                this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                this.selected = [];
                this.author = this.userService.get();
                this.author = this.author.coach.id;
                this.assignee = this.userService.selectedUser;
                this.assignee = this.assignee.id;
            }
            ReminderController.prototype.addReminder = function ($event) {
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
                if (this.selected.length === this.days.length) {
                    this.selected = [];
                }
                else if (this.selected.length === 0 || this.selected.length > 0) {
                    this.selected = this.days.slice(0);
                }
            };
            ;
            ReminderController.prototype.isChecked = function () {
                return this.selected.length === this.days.length;
            };
            ;
            ReminderController.prototype.isIndeterminate = function () {
                return (this.selected.length !== 0 &&
                    this.selected.length !== this.days.length);
            };
            ;
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
                if (this.selected.indexOf('Sun') != -1) {
                    dates.sunday = true;
                }
                if (this.selected.indexOf('Mon') != -1) {
                    dates.monday = true;
                }
                if (this.selected.indexOf('Tues') != -1) {
                    dates.tuesday = true;
                }
                if (this.selected.indexOf('Wed') != -1) {
                    dates.wednesday = true;
                }
                if (this.selected.indexOf('Thurs') != -1) {
                    dates.thursday = true;
                }
                if (this.selected.indexOf('Fri') != -1) {
                    dates.friday = true;
                }
                if (this.selected.indexOf('Sat') != -1) {
                    dates.saturday = true;
                }
                var reminder = {
                    title: this.reminder,
                    timeOfDay: this.time.toLocaleTimeString(),
                    selectedDates: this.selected,
                    daysOfTheWeek: dates,
                    author: this.author,
                    assignee: this.assignee
                };
                console.log(reminder);
                this.$mdDialog.hide(reminder);
            };
            ReminderController.$inject = ['$mdDialog', 'userService'];
            return ReminderController;
        }());
        dashboard.ReminderController = ReminderController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=reminderController.js.map