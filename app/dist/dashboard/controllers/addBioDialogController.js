/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var AddBioDialogController = (function () {
            function AddBioDialogController($mdDialog, userService) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;

                this.author = this.userService.get();
                if (this.author.role == "coach") {
                    this.author = this.author.id;
                    this.assignee = this.userService.selectedUser;
                    this.assignee = this.assignee._id;
                }
                else if (this.author.role == "user") {
                    this.author = this.author.id;
                    this.assignee = this.author;
                }

            }

            AddBioDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            ;
            AddBioDialogController.prototype.save = function () {

              var bio = {
                body: this.bio,
                author: this.author,
                assignee: this.assignee
              }
            
              this.$mdDialog.hide(bio);
            };
            ;
            AddBioDialogController.$inject = ['$mdDialog', 'userService'];
            return AddBioDialogController;
        }());
        dashboard.AddBioDialogController = AddBioDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=AddBioDialogController.js.map
