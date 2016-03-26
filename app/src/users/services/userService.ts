/// <reference path="../_all.ts" />

module app.users {

  export interface IUserService {
    id: any;
    user: any;
    clients: any;
    role: any;
    name: any;
    get (): any;
    loadAllClients(): ng.IPromise<any>;
    selectedUser: any;
  }

  export class UserService implements IUserService {

    id: any;
    name: any;
    user: any;
    clients: any;
    role: any;

    static $inject = ['$window', '$q'];

    constructor(private $window: ng.IWindowService, private $q: ng.IQService) {
      this.user = window['user'];
      this.name = this.user.username;
      this.clients = this.user.clients;
      this.role = this.user.role;
    }

    selectedUser: any = null;

    get (): any {
      return this.user;
    }

    loadAllClients(): ng.IPromise<any> {
      return this.$q.when(this.clients);
    }





  }

}
