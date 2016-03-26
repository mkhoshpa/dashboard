/// <reference path="../_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        var UserService = (function () {
            function UserService($window, $q) {
                this.$window = $window;
                this.$q = $q;
                this.selectedUser = null;
                this.user = window['user'];
                this.name = this.user.username;
                this.clients = this.user.clients;
                this.role = this.user.role;
            }
            UserService.prototype.get = function () {
                return this.user;
            };
            UserService.prototype.loadAllClients = function () {
                return this.$q.when(this.clients);
            };
            UserService.$inject = ['$window', '$q'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map