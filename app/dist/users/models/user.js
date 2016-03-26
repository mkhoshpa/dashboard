/// <reference path="../_all.ts" />
var app;
(function (app) {
    var users;
    (function (users) {
        var User = (function () {
            function User(username, email, role, slackUser, slackId, slackTeam) {
                this.username = username;
                this.email = email;
                this.role = role;
                this.slackUser = slackUser;
                this.slackId = slackId;
                this.slackTeam = slackTeam;
            }
            return User;
        }());
        users.User = User;
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
//# sourceMappingURL=user.js.map