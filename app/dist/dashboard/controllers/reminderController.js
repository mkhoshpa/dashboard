var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var ReminderController = (function () {
            function ReminderController($mdDialog, $mdpDatePicker, $mdpTimePicker, userService) {
                this.$mdDialog = $mdDialog;
                this.$mdpDatePicker = $mdpDatePicker;
                this.$mdpTimePicker = $mdpTimePicker;
                this.userService = userService;
            }
            ReminderController.prototype.addReminder = function ($event) {
            };
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