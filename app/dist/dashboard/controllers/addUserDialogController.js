var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var AddUserDialogController = (function () {
            function AddUserDialogController($mdDialog, userService, $http) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.$http = $http;
                this.creator = this.userService.get();
                this.avatars = [
                    'svg-1', 'svg-2', 'svg-3', 'svg-4'
                ];
            }
            AddUserDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            AddUserDialogController.prototype.save = function () {
                this.$mdDialog.hide(this.user);
                console.log(this.user.name + '--');
            };
            AddUserDialogController.$inject = ['$mdDialog', 'userService', '$http'];
            return AddUserDialogController;
        }());
        dashboard.AddUserDialogController = AddUserDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=addUserDialogController.js.map