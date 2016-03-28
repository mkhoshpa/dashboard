/// <reference path="../_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        var UserService = (function () {
            function UserService($window, $q, $http, slackService) {
                this.$window = $window;
                this.$q = $q;
                this.$http = $http;
                this.slackService = slackService;
                this.selectedUser = null;
                this.user = window['user'];
                this.name = this.user.username;
                this.clients = this.user.clients;
                this.role = this.user.role;
                this.http = $http;
                this.slackService = slackService;
            }
            UserService.prototype.get = function () {
                return this.user;
            };
            UserService.prototype.loadClients = function () {
                return this.$q.when(this.clients);
            };
            UserService.prototype.insert = function (params) {
                return this.http.post('/api/slack/' + params)
                    .then(function (response) { return response.data; });
            };
            UserService.prototype.slack = function () {
                console.log('hit');
                return this.slackService.userList("xoxp-21143396339-21148553634-24144454581-f6d7e3347d")
                    .then(function (response) { return response; });
            };
            UserService.$inject = ['$window', '$q', '$http', 'slackService'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map