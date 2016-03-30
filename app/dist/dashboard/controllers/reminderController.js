var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var ReminderController = (function () {
            function ReminderController($mdDialog, $mdpDatePicker, $mdpTimePicker, userService, chips) {
                this.$mdDialog = $mdDialog;
                this.$mdpDatePicker = $mdpDatePicker;
                this.$mdpTimePicker = $mdpTimePicker;
                this.userService = userService;
                this.chips = chips;
                this.items = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                this.selected = [];
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
            ReminderController.prototype.close = function () {
                this.$mdDialog.cancel();
            };
            ReminderController.prototype.save = function () {
                this.$mdDialog.hide();
            };
            ReminderController.$inject = ['$mdDialog', '$mdpDatePicker', '$mdpTimePicker', 'userService'];
            return ReminderController;
        }());
        dashboard.ReminderController = ReminderController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=reminderController.js.map