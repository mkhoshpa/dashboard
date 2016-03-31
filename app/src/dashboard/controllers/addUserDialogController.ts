/// <reference path="../_all.ts" />

module app.dashboard {

  export class AddUserDialogController {
    static $inject = ['$mdDialog', 'userService'];

    constructor(private $mdDialog,
                private userService) {}

    user: any = this.userService.get();
    //creator: any = this.userService.get();



    avatars = [
      'svg-1','svg-2','svg-3','svg-4'
    ];

    cancel(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide();
    }
  }

}