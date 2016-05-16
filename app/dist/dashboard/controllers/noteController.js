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
              this.$mdDialog.cancel();
            };

            NoteController.prototype.save = function () {
              console.log("Getting somewhere");

              var note = {
                body: this.note
              }
              this.$mdDialog.hide(note);
            };

            NoteController.$inject = ['$mdDialog', 'userService'];
            return NoteController;
        }());
        dashboard.NoteController = NoteController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
