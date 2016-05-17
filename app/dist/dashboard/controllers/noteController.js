var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var NoteController = (function () {
            function NoteController($mdDialog, userService, selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;

                this.author = this.userService.get();
            }

            NoteController.prototype.cancel = function () {
              this.$mdDialog.cancel();
            };

            NoteController.prototype.save = function () {
              console.log("Getting somewhere");

              var note = {
                body: this.note,
                author: this.author.id,
                assignee: this.selected
              }
              this.$mdDialog.hide(note);
            };

            NoteController.$inject = ['$mdDialog', 'userService', 'selected'];
            return NoteController;
        }());
        dashboard.NoteController = NoteController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
