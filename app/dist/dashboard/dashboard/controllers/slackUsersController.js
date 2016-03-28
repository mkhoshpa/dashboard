/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SlackUsersController = (function () {
            function SlackUsersController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.user = this.userService.get();
            }
            //creator: any = this.userService.get();
            SlackUsersController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            SlackUsersController.prototype.save = function () {
                this.$mdDialog.hide();
            };
            SlackUsersController.$inject = ['$mdDialog', 'userService'];
            return SlackUsersController;
        }());
        dashboard.SlackUsersController = SlackUsersController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=slackUsersController.js.map