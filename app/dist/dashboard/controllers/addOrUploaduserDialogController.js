/// <reference path="../all.ts" />
var app;
(function (app) {
  var dashboard;
  (function (dashboard) {
    var AddOrUploadUserDialogController = (function () {
      function AddOrUploadUserDialogController($mdDialog, userService) {
        this.$mdDialog = $mdDialog;
        this.userService = userService;
        this.user = this.userService.get();
        console.log(this.user);

        this.avatars = [
          'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];
      }
      AddOrUploadUserDialogController.prototype.cancel = function () {
        this.$mdDialog.cancel();
      };
      AddOrUploadUserDialogController.prototype.add = function () {
        // TODO: figure out how to route to another controller
      };
      AddOurUploadUserDialogController.prototype.upload = function () {
        // TODO: figure out how to route to another controller
      }
    })
  })
})
