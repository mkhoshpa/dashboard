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
                    return this.user;
                }
                else {
                    return {
                        user: this.user
                    };
                }
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
            UserService.prototype.insert = function (params) {
                return this.http.post('/api/slack/' + params)
                    .then(function (response) { return response.data; });
            };
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