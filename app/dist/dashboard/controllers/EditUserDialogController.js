/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var EditUserDialogController = (function () {
            function EditUserDialogController($mdDialog, userService,selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.user = this.userService.get();
                this.selected = selected;
                console.log(this.user);
                console.log("selected" + JSON.stringify(this.selected));
                //creator: any = this.userService.get();
                this.avatars = [
                    "matt.png", "thom.png", "tiffany.png", "victoria.png"
                ];
            }
            EditUserDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            EditUserDialogController.prototype.save = function () {
                console.log("Saving user.");
                /*var user = {
                 firstName: 'Shadfdasda',
                 lastName: 'Peleiafdaser',
                 bio: 'This is my bo. It afasis aweome.',
                 username: 'slajlkflier',
                 password: 'ilinnafdafpafai',
                 slack_id: 'efe235gafafdassaf',
                 slack: {
                 email: 'shne.peleier@ufadfnb.ca',
                 id: 'speltadffadfsi',
                 name: 'Shnsgfsadsfage',
                 real_name: 'Safdashne Padfasfseaaaaalltier',
                 },
                 coaches: [this.user._id]
                 };*/
                var user = {

                    firstName: this.firstName,
                    lastName: this.lastName,
                    bio: this.bio,
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    /*
                     slack_id: this.slack_id,
                     slack: {
                     email: this.slack.email,
                     id: this.slack.id,
                     name: this.slack.real_name,
                     img: '/assets/img/' + this.avatars[Math.floor(Math.random() * 7)]
                     },
                     */
                    coaches: [this.user._id],
                    role: "user",

                    imgUrl: '/assets/img/' + this.avatars[Math.floor(Math.random() * 3)],
                    phoneNumber: this.phoneNumber
                }
                console.log(user);

                this.$mdDialog.hide(user);
            };
            EditUserDialogController.$inject = ['$mdDialog', 'userService', 'selected'];

            return AddUserDialogController;
        }());
        dashboard.EditUserDialogController = EditUserDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=addUserDialogController.js.map
