/// <reference path="_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        angular
            .module('users', [])
            .service('userService', users.UserService);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map