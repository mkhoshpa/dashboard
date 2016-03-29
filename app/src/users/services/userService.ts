/// <reference path="../_all.ts" />

module app.users {

  export interface IUserService {
    id: any;
    user: any;
    clients: any;
    role: any;
    name: any;
    get (): any;
    loadClients(): ng.IPromise<any>;
    selectedUser: any;
  }

  export class UserService implements IUserService {

    id: any;
    name: any;
    user: any;
    clients: any;
    role: any;
    http: any;
    resource: any;


    static $inject = ['$window', '$q', '$http', 'slackService', '$resource'];

    constructor(private $window: ng.IWindowService,
                private $q: ng.IQService,
                private $http: ng.IHttpService,
                private slackService: SlackService,
                private $resource: ng.resource.IResource<any>) {
      this.user = window['user'];
      this.name = this.user.username;
      this.clients = this.user.clients;
      this.role = this.user.role;
      this.http = $http;
      this.slackService = slackService;
      this.resource = $resource;
    }

    selectedUser: any = null;

    get (): any {
      return this.user;
    }

    // Email is the passport ID
    create(email: any, slack: any): ng.IPromise<any> {
      return this.http.post('/generate', {
        username: email,
        // Contains slack info
        slack: slack
      })
      .then(function(user: any) {
        console.log(Date.now());
        return user;
      });
    }

    loadClients(): ng.IPromise<any> {
      return this.$http.get('/users')
      .then(response => response.data);
    }
    // Inserts uses id into a coach's client array
    insert(params: any): ng.IPromise<any> {
      return this.http.post('/api/slack/' + params)
      .then(response => response.data);
    }

    slack(): ng.IPromise<any> {
      console.log('hit');
      return this.slackService.userList("xoxp-21143396339-21148553634-24144454581-f6d7e3347d")
        .then(response => response);
    }

  }

}
