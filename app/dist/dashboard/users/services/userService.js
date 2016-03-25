/// <reference path="../_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        var UserService = (function () {
            function UserService($window) {
                this.$window = $window;
                this.user = window['user'];
            }
            UserService.prototype.get = function () {
                return this.user;
            };
            UserService.$inject = ['$window'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map