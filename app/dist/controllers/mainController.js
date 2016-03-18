/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var MainController = (function () {
        function MainController(userService, $mdSidenav, $mdBottomSheet, $mdToast, $mdDialog, $mdMedia) {
            this.userService = userService;
            this.$mdSidenav = $mdSidenav;
            this.$mdBottomSheet = $mdBottomSheet;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.$mdMedia = $mdMedia;
            this.searchText = '';
            this.tabIndex = 0;
            this.selected = null;
            this.users = [];
            this.newNote = new ContactManagerApp.Note('', null);
            this.newReminder = new ContactManagerApp.Reminder('', null);
            var self = this;
            this.userService
                .loadAllUsers()
                .then(function (users) {
                self.users = users;
                self.selected = users[0];
                self.userService.selectedUser = self.selected;
            });
        }
        MainController.prototype.setFormScope = function (scope) {
            this.formScope = scope;
        };
        MainController.prototype.addUser = function ($event) {
            var self = this;
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            this.$mdDialog.show({
                templateUrl: './dist/view/newUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: ContactManagerApp.AddUserDialogController,
                controllerAs: "ctrl",
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function (user) {
                var newUser = ContactManagerApp.User.fromCreate(user);
                self.users.push(newUser);
                self.selectUser(newUser);
                self.openToast("User added");
            }, function () {
                console.log('You cancelled the dialog.');
            });
        };
        MainController.prototype.slackMessage = function ($event, user) {
            var self = this;
            this.userService.selectedUser = user;
            console.log(user);
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            this.$mdDialog.show({
                templateUrl: './dist/view/sendSlackMessage.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: ContactManagerApp.PostMessage,
                controllerAs: "slack",
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };
        MainController.prototype.addReminder = function () {
            this.selected.reminders.push(this.newReminder);
            this.newReminder = new ContactManagerApp.Reminder('', null);
            this.formScope.reminderForm.$setUntouched();
            this.formScope.reminderForm.$setPristine();
            this.openToast("Reminder added!");
            console.log(this.selected);
        };
        MainController.prototype.removeReminder = function (reminder) {
            var foundIndex = this.selected.reminders.indexOf(reminder);
            this.selected.reminders.splice(foundIndex, 1);
            this.openToast("Reminder removed");
        };
        MainController.prototype.clearReminders = function ($event) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete all reminders?')
                .textContent('All reminders will be deleted, you can\'t undo this action.')
                .ariaLabel('Delete all reminders')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');
            var self = this;
            this.$mdDialog.show(confirm).then(function () {
                self.selected.reminders = [];
                self.openToast("Cleared reminders");
            });
        };
        MainController.prototype.removeNote = function (note) {
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex, 1);
            this.openToast("Note removed");
        };
        MainController.prototype.addNote = function () {
            this.selected.notes.push(this.newNote);
            this.newNote = new ContactManagerApp.Note('', null);
            this.formScope.noteForm.$setUntouched();
            this.formScope.noteForm.$setPristine();
            this.openToast("Note added");
        };
        MainController.prototype.clearNotes = function ($event) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete all notes?')
                .textContent('All notes will be deleted, you can\'t undo this action.')
                .ariaLabel('Delete all notes')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');
            var self = this;
            this.$mdDialog.show(confirm).then(function () {
                self.selected.notes = [];
                self.openToast("Cleared notes");
            });
        };
        MainController.prototype.openToast = function (message) {
            this.$mdToast.show(this.$mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(5000));
        };
        MainController.prototype.toggleList = function () {
            this.$mdSidenav('left').toggle();
        };
        MainController.prototype.selectUser = function (user) {
            this.selected = user;
            this.userService.selectedUser = user;
            var sidebar = this.$mdSidenav('left');
            if (sidebar.isOpen()) {
                sidebar.close();
            }
            this.tabIndex = 0;
        };
        MainController.prototype.showContactOptions = function ($event) {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: './dist/view/contactSheet.html',
                controller: ContactManagerApp.ContactPanelController,
                controllerAs: "cp",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                clickedItem && console.log(clickedItem.name + ' clicked!');
            });
        };
        MainController.$inject = ['userService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$mdDialog', '$mdMedia'];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=mainController.js.map