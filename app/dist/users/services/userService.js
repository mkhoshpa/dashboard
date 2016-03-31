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
                if (this.user.role == "coach") {
                    return {
                        coach: this.user,
                        clients: this.clients
                    };
                }
                else {
                    return {
                        user: this.user
                    };
                }
            };
            // Email is the passport ID
            UserService.prototype.create = function (email, slack) {
                return this.http.post('/generate', {
                    username: email,
                    // Contains slack info
                    slack: slack
                })
                    .then(function (user) {
                    console.log(Date.now());
                    return user;
                });
            };
            // loadClients(): ng.IPromise<any> {
            //   return this.$http.get('/users')
            //   .then(response => response.data);
            // }
            // Inserts uses id into a coach's client array
            UserService.prototype.insert = function (params) {
                return this.http.post('/api/slack/' + params)
                    .then(function (response) { return response.data; });
            };
            // slack(): ng.IPromise<any> {
            //   console.log('hit');
            //   return this.slackService.userList("xoxp-21143396339-21148553634-24144454581-f6d7e3347d")
            //     .then(response => response);
            // }
            UserService.prototype.remind = function (reminder) {
                return this.http.post('/api/reminder/' + reminder.user)
                    .then(function (response) { return response.data; });
            };
            UserService.$inject = ['$window', '$q', '$http', 'slackService'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map