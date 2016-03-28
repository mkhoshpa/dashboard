/// <reference path="_all.ts" />

module app.users {
  angular
    .module('users', [])
    .service('slackService', SlackService)
    .service('userService', UserService);
}
