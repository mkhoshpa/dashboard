/// <reference path="../_all.ts" />

module app.dashboard {

  export class SlackUsersController {
    static $inject = ['$mdDialog', 'userService'];

    constructor(private $mdDialog,
                private userService) {}

    user: any = this.userService.get();
    //creator: any = this.userService.get();

    cancel(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide();
    }
  }

}
