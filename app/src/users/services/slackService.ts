/// <reference path="../_all.ts" />

module app.users {

  export class SlackService  {

    http: any;
    token: string;

    static $inject = ['$http'];

    constructor (private $http: ng.IHttpService){
                  this.http = $http;
                }

                

  }

}
