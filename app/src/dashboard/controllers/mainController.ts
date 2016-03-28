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

        self.userService
          .loadClients()
          .then((clients: any) => {
            this.clients = clients;
            self.selected = clients[0];
            self.userService.selectedUser = self.selected;
          });

        this.userService.slack().then((members: any) => {
              this.members = members.members;
              self.slack = [];
              console.log("members: " + this.members);
              this._.forEach(this.members, function(member) {
                if(!member.is_bot && !member.deleted){
                  self.slack.push({
                    team: member.team_id,
                    id: member.id,
                    name: member.name,
                    real_name: member.real_name,
                    email: member.profile.email,
                    img: member.profile.image_72,
                    timezone: member.tz
                  });
                }
              });

              console.log(self.slack);
        });



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
    users: any[] = [ ];
    clients: any;
    newNote: Note = new Note('', null);
    newReminder: Reminder = new Reminder('', null);
    slack: any[];
    members: any[];

    setFormScope(scope) {
      this.formScope = scope;
    }

    addUser($event) {
      var self = this;

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
      this.$mdDialog.show({
        templateUrl: './dist/view/dashboard/newUserDialog.html',
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

    slackMessage($event, user) {
      var self = this;
      this.userService.selectedUser = user;

      console.log(self.current);
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
      this.$mdDialog.show({
        templateUrl: './dist/view/dashboard/sendSlackMessage.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: SlackUsersController,
        controllerAs: "slack",
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      }).then(() => {

        var members: any = this.userService.slack().then(function(result) {
          console.log(result);
        });

      }, () => {
        console.log('You cancelled the dialog.');
      });
    }

    slackList() {
      var test = this.userService.slack().then((members: any) => {
        console.log('here');
        console.log(members);
      });

    }

    testButton(email: any, slack: any) {
      console.log('test-button');
      var test = this.userService.create(email, slack)
      .then(function(result: any)  {
        console.log(result);
      },
          function(err) {
            console.log(err);
          })
    }

    addReminder() {
      this.selected.reminders.push(this.newReminder);
      this.newReminder = new Reminder('', null);

      this.formScope.reminderForm.$setUntouched();
      this.formScope.reminderForm.$setPristine();

      this.openToast("Reminder added!");
      console.log(this.selected);
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

      var sidebar = this.$mdSidenav('left');
      if (sidebar.isOpen()) {
        sidebar.close();
      }

      this.tabIndex = 0;
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
