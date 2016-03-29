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
            SlackService.$inject = ['$http'];
            return SlackService;
        }());
        users.SlackService = SlackService;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=slackService.js.map