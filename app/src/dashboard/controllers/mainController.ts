/// <reference path="../_all.ts" />

module app.dashboard {

  export class MainController {
    static $inject = ['userService', '$mdSidenav', '$mdBottomSheet',
                      '$mdToast', '$mdDialog', '$mdMedia', '$http'];

    constructor(
      private userService: app.users.UserService,
      private $mdSidenav: angular.material.ISidenavService,
      private $mdBottomSheet: angular.material.IBottomSheetService,
      private $mdToast: angular.material.IToastService,
      private $mdDialog: angular.material.IDialogService,
      private $mdMedia: angular.material.IMedia,
      private $http: angular.IHttpService)
      {
        var self = this;

        this.current = this.userService.get();
        if(this.current.user) {
          this.isUser = true;
          self.selected = this.current.user;
          console.log('is a user');
        }
        else if(this.current.coach) {
          this.isCoach=true;
          this.coach = this.current.coach;
          this.clients = this.current.clients;
          self.selected = this.clients[0];
          console.log('is a coach');
        }
        self.userService.selectedUser = self.selected;




      //  this.userService.loadClients()
      //   .then(function(result) {
      //     self.users = result;
      //     console.log(self.users);
      //   });


        this._ = window['_'];


        this.name = this.current.username;
        console.log('name: ' + this.name);
        console.log('role: ' + this.current.role);
    }

    _: any;
    current: any;
    name: string;
    searchText: string = '';
    formScope: any;
    tabIndex: number = 0;
    selected: any = null;

    isCoach: boolean;
    isUser: boolean;

    coach: any;
    clients: any;

    newNote: Note = new Note('', null);
    newReminder: Reminder = new Reminder('', null);

    slack: any[];
    slack_emails: any[];
    members: any[];
    users: any[];

    // convertToUsers(slack: any[]) {
    //   console.log('convertToUsers: ' + this.slack);
    //   this.userService.
    // }

    setFormScope(scope) {
      this.formScope = scope;
    }

    addUser($event) {
      var self = this;

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
      this.$mdDialog.show({
        templateUrl: './dist/view/dashboard/user/newUserDialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: AddUserDialogController,
        controllerAs: "ctrl",
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      }).then((user: any) => {
        // Call user service
        console.log('this is user' + JSON.stringify(user));
        var newUser: any = this.userService.insert(user.name).then(function(result) {
          self.clients.push(result);
          self.selectUser(result);
        });

        self.openToast("User added");
      }, () => {
        console.log('You cancelled the dialog.');
      });
    }

    addReminder($event) {
      var self = this;

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
      this.$mdDialog.show({
        templateUrl: './dist/view/dashboard/reminders/modal.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: ReminderController,
        controllerAs: "ctrl",
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      }).then((reminder: any) => {
        // Post request, and push onto users local list of reminders
        // this.$http.post('uri').then((response) => response.data)
        // after promise is succesful add to
        // reminder.assigne.reminders.push()
        this.selected.reminders.push(reminder);

        self.openToast("Remminder added");
      }, () => {
        console.log('You cancelled the dialog.');
      });
    }

    slackList() {
      // var test = this.userService.slack().then((members: any) => {
      //   console.log('here');
      //   console.log(members);
      // });

    }

    testButton(email: any, slack: any) {
      console.log('test-button');
      var test = this.userService.create(email, slack)
      .then(
        function(result: any)  {
          console.log(result);
        },
        function(err) {
          console.log(err);
        }
      )
    }



    removeReminder(reminder) {
      var foundIndex = this.selected.reminders.indexOf(reminder);
      this.selected.reminders.splice(foundIndex, 1);
      this.openToast("Reminder removed");
    }

    clearReminders($event) {
      var confirm = this.$mdDialog.confirm()
        .title('Are you sure you want to delete all reminders?')
        .textContent('All reminders will be deleted, you can\'t undo this action.')
        .ariaLabel('Delete all reminders')
        .targetEvent($event)
        .ok('Yes')
        .cancel('No');

        var self = this;
        this.$mdDialog.show(confirm).then(() => {
          self.selected.reminders = [];
          self.openToast("Cleared reminders");
        });
    }

    removeNote(note) {
      var foundIndex = this.selected.notes.indexOf(note);
      this.selected.notes.splice(foundIndex, 1);
      this.openToast("Note removed");
    }

    addNote() {
      this.selected.notes.push(this.newNote);
      this.newNote = new Note('', null);

      this.formScope.noteForm.$setUntouched();
      this.formScope.noteForm.$setPristine();

      this.openToast("Note added");
    }

    clearNotes($event) {
      var confirm = this.$mdDialog.confirm()
        .title('Are you sure you want to delete all notes?')
        .textContent('All notes will be deleted, you can\'t undo this action.')
        .ariaLabel('Delete all notes')
        .targetEvent($event)
        .ok('Yes')
        .cancel('No');

        var self = this;
        this.$mdDialog.show(confirm).then(() => {
          self.selected.notes = [];
          self.openToast("Cleared notes");
        });
    }

    openToast(message): void {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(message)
          .position('top right')
          .hideDelay(5000)
        );
    }

    toggleList() {
      this.$mdSidenav('left').toggle();
    }

    selectUser ( user ) {
      this.selected = user;
      console.log(this.selected);
      var sidebar = this.$mdSidenav('left');
      if (sidebar.isOpen()) {
        sidebar.close();
      }

      this.tabIndex = 0;
    }

    hasReal(user) {
      if(user.slack.real_name) {
        return true;
      }
      else {
        return false;
      }
    }

    showContactOptions($event) {
      this.$mdBottomSheet.show({
        parent: angular.element(document.getElementById('wrapper')),
        templateUrl: './dist/view/dashboard/contactSheet.html',
        controller: DashboardController,
        controllerAs: "cp",
        bindToController : true,
        targetEvent: $event
      }).then((clickedItem) => {
        clickedItem && console.log( clickedItem.name + ' clicked!');
      });
    }
  }
}
