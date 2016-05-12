/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var AddBioDialogController = (function () {
            function AddBioDialogController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;


            }

            AddBioDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            ;
            AddBioDialogController.prototype.save = function () {
                console.log(this.bio);



                this.$mdDialog.hide(this.bio);
            };
            ;
            AddBioDialogController.$inject = ['$mdDialog', 'userService'];
            return AddBioDialogController;
        }());
        dashboard.AddBioDialogController = AddBioDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=AddBioDialogController.js.map
