/// <reference path="../_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        var SlackService = (function () {
            function SlackService($http) {
                this.$http = $http;
                this.http = $http;
            }
            SlackService.prototype.userList = function (token) {
                return this.http.get('https://slack.com/api/users.list?token=' + token)
                    .then(function (response) { return response.data; });
            };
            SlackService.prototype.parseSlack = function (members) {
            };
            SlackService.$inject = ['$http'];
            return SlackService;
        }());
        users.SlackService = SlackService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=slackService.js.map