var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SettingsController = (function () {
            function SettingsController($mdDialog) {
                this.$mdDialog = $mdDialog;

            }

            SettingsController.prototype.cancel = function () {
              this.$mdDialog.cancel();
            };

            SettingsController.prototype.save = function () {
              console.log("Getting somewhere");


              this.$mdDialog.hide(note);
            };

            SettingsController.$inject = ['$mdDialog'];
            return SettingsController;
        }());
        dashboard.SettingsController = SettingsController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
