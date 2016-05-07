/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var userController = (function () {
            function userController($mdDialog, userService, selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.selected = selected;
                this.username = username;

                this.avatars = [
                    'svg-1', 'svg-2', 'svg-3', 'svg-4'
                ];
            }
            userController.prototype.cancel = function () {
                console.log('hello');
                this.$mdDialog.cancel();
            };
            userController.prototype.save = function () {
              console.log("holy fuck getting somewhere");
                this.$mdDialog.hide();
            };
            userController.$inject = ['$mdDialog', 'userService'];
            return userController;
        }());
        dashboard.userController = userController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=addUserDialogController.js.map
