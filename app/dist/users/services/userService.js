var app;
(function (app) {
    var users;
    (function (users) {
        var UserService = (function () {
            function UserService($window, $q, $http) {
                this.$window = $window;
                this.$q = $q;
                this.$http = $http;
                this.selectedUser = null;
                this.user = window['user'];
                this.name = this.user.username;
                this.clients = this.user.clients;
                this.role = this.user.role;
            }
            UserService.prototype.get = function () {
                return this.user;
            };
            UserService.prototype.loadClients = function () {
                return this.$q.when(this.clients);
            };
            UserService.prototype.insert = function (id) {
                this.$http.post('/api/slack/' + id)
                    .success(function (result) {
                });
            };
            UserService.$inject = ['$window', '$q', '$http'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map