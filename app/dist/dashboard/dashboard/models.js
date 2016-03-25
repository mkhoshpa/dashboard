/// <reference path="_all.ts" />
// Comment
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var CreateUser = (function () {
            function CreateUser(firstName, lastName, avatar, bio, slack) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.avatar = avatar;
                this.bio = bio;
                this.slack = slack;
            }
            return CreateUser;
        }());
        dashboard.CreateUser = CreateUser;
        var User = (function () {
            function User(name, avatar, bio, slack, notes, reminders, surveys) {
                this.name = name;
                this.avatar = avatar;
                this.bio = bio;
                this.slack = slack;
                this.notes = notes;
                this.reminders = reminders;
                this.surveys = surveys;
            }
            User.fromCreate = function (user) {
                return new User(user.firstName + ' ' + user.lastName, user.avatar, user.bio, user.slack, [], [], []);
            };
            return User;
        }());
        dashboard.User = User;
        var Note = (function () {
            function Note(title, date) {
                this.title = title;
                this.date = date;
            }
            return Note;
        }());
        dashboard.Note = Note;
        var Reminder = (function () {
            function Reminder(title, date) {
                this.title = title;
                this.date = date;
            }
            return Reminder;
        }());
        dashboard.Reminder = Reminder;
        var Survey = (function () {
            function Survey(title, first, second, third, fourth, fifth, sixth, date) {
                this.title = title;
                this.first = first;
                this.second = second;
                this.third = third;
                this.fourth = fourth;
                this.fifth = fifth;
                this.sixth = sixth;
                this.date = date;
            }
            return Survey;
        }());
        dashboard.Survey = Survey;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=models.js.map