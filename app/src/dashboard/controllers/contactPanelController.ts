/// <reference path="../_all.ts" />

module app.dashboard {

  export class DashboardController {
    static $inject = ['userService', '$mdBottomSheet'];

    constructor(
      private userService: app.users.UserService,
      private $mdBottomSheet) {
      //this.user = userService.selectedUser;
    }

    user: any;

    actions = [
      { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
      { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
      { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
      { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
    ];

    submitContact(action): void {
      this.$mdBottomSheet.hide(action);
    }
  }

}
