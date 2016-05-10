var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var EditNoteController = (function () {
            function EditNoteController($mdDialog, userService, selected) {
              this.$mdDialog = $mdDialog;
              this.userService = userService;
              this.selected = selected;



              EditNoteController.prototype.cancel = function () {
                console.log("Hey Im here");
                this.$mdDialog.cancel();
              };

              EditNoteController.prototype.save = function(){
                  this.$mdDialog.hide("hi");
              }
            };
            EditNoteController.$inject = ['$mdDialog', 'userService', 'selected'];
            return EditNoteController;
        }());
        dashboard.EditNoteController = EditNoteController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=NoteController.js.map
