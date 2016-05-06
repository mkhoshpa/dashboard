/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var AddUserDialogController = (function () {
            function AddUserDialogController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.user = this.userService.get();
                console.log(this.user);
                
                //creator: any = this.userService.get();
                this.avatars = [
                    'svg-1', 'svg-2', 'svg-3', 'svg-4'
                ];
            }
            AddUserDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            AddUserDialogController.prototype.save = function () {
                //weird naming on coachesId
                var arr = [];
                arr[0] = this.user.id;


                var user = {
                  username : this.username,
                  coaches : arr
                };



                this.$mdDialog.hide(user);
            };
            AddUserDialogController.$inject = ['$mdDialog', 'userService'];

            return AddUserDialogController;
        }());
        dashboard.AddUserDialogController = AddUserDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=addUserDialogController.js.map
