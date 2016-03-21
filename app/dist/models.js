var ContactManagerApp;
(function (ContactManagerApp) {
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
    ContactManagerApp.CreateUser = CreateUser;
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
    ContactManagerApp.User = User;
    var Note = (function () {
        function Note(title, date) {
            this.title = title;
            this.date = date;
        }
        return Note;
    }());
    ContactManagerApp.Note = Note;
    var Reminder = (function () {
        function Reminder(title, date) {
            this.title = title;
            this.date = date;
        }
        return Reminder;
    }());
    ContactManagerApp.Reminder = Reminder;
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
    ContactManagerApp.Survey = Survey;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=models.js.map