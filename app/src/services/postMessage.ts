/// <reference path="../_all.ts" />

// This should be a controller, not a service. Will fix.
module ContactManagerApp {

  export class PostMessage{

    static $inject = ['userService', '$mdDialog'];

    constructor(private userService: IUserService,
                private $mdDialog) {
                  this.user = userService.selectedUser;
                }

    user: User;

    cancel(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide();
    }
  }

}
