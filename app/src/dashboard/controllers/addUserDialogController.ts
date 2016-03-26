/// <reference path="../_all.ts" />

module app.dashboard {

  export class AddUserDialogController {
    static $inject = ['$mdDialog', 'userService', '$http'];

    constructor(private $mdDialog,
                private userService,
                private $http) {}

    user: any;
    creator: any = this.userService.get();



    avatars = [
      'svg-1','svg-2','svg-3','svg-4'
    ];

    cancel(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide(this.user);
      console.log(this.user.name + '--');

    }
  }

}
