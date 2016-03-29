var app;
(function (app) {
    var users;
    (function (users) {
        var UserService = (function () {
            function UserService($window, $q, $http, slackService, $resource) {
                this.$window = $window;
                this.$q = $q;
                this.$http = $http;
                this.slackService = slackService;
                this.$resource = $resource;
                this.selectedUser = null;
                this.user = window['user'];
                this.name = this.user.username;
                this.clients = this.user.clients;
                this.role = this.user.role;
                this.http = $http;
                this.slackService = slackService;
                this.resource = $resource;
            }
            UserService.prototype.get = function () {
                return this.user;
            };
            UserService.prototype.create = function (email, slack) {
                return this.http.post('/generate', {
                    username: email,
                    slack: slack
                })
                    .then(function (user) {
                    console.log(Date.now());
                    return user;
                });
            };
            UserService.prototype.loadClients = function () {
                return this.$http.get('/users')
                    .then(function (response) { return response.data; });
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
            UserService.$inject = ['$window', '$q', '$http', 'slackService', '$resource'];
            return UserService;
        }());
        users.UserService = UserService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map