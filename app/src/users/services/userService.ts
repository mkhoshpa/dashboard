/// <reference path="../_all.ts" />

module app.users {

  export interface IUserService {
    user: any;
    get (): any;
  }

  export class UserService implements IUserService {

    user: any;
    static $inject = ['$window'];

    constructor(private $window: ng.IWindowService) {
      this.user = window['user'];
    }

    get (): any {
      return this.user;
    }

  }

}
