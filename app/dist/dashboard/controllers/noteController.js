var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var NoteController = (function () {
            function NoteController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;


            }

            NoteController.prototype.cancel = function () {
              console.log('hello');
              this.$mdDialog.cancel();
            };

            NoteController.prototype.save = function () {
              console.log("holy fuck getting somewhere");
              this.$mdDialog.hide(this.note);
            };

            NoteController.$inject = ['$mdDialog', 'userService'];
            return NoteController;
        }());
        dashboard.NoteController = NoteController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
