/// <reference path="../_all.ts" />

module app.users {

  export class SlackService  {

    http: any;
    token: string;

    static $inject = ['$http'];

    constructor (private $http: ng.IHttpService){
                  this.http = $http;
                }

    userList(token: string): ng.IPromise<any> {
      return this.http.get('https://slack.com/api/users.list?token=' + token)
      .then(response => response.data);
    }

    parseSlack (members: any) {

    }

  }

}
