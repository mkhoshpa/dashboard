/// <reference path="../_all.ts" />

module app.dashboard {

  export class SurveyController {

    static $inject = ['$mdDialog', 'userService', '$http'];

    user: any;
    selected: any[];
    assignee: any;
    author: any;

    options = [
      'Anxiety', 'Stress', 'Weightloss', 'Productivity'
    ]

    first: {
      improvement: any,
      action: any,
      time: any,
    }

    second: {
      improvement: any,
      action: any,
      time: any,
    }

    another: any;

    constructor(private $mdDialog,
                private userService,
                private $http
                ){
                  this.author = this.userService.get();
                  if(this.author.role == "coach") {
                    this.author = this.author.id;
                    console.log('is coach');
                    this.assignee = this.userService.selectedUser;
                    this.assignee = this.assignee._id;
                    console.log(this.assignee);
                  }
                  else if (this.author.role == "user") {
                    this.author = this.author.id;
                    this.assignee = this.author;
                    console.log('is user');
                    console.log('assignee');
                    console.log(this.assignee);
                  }

                }

    close(): void {
      this.$mdDialog.cancel();
    }

    save(): void {

      var survey = {
        author: this.author,
        assignee: this.assignee,
        status: true,
        improvements: [
          this.first.improvement,
          this.second.improvement,
        ],
        reminders: [
          {
            action: this.first.action,
            time: this.first.time,
          },
          {
            action: this.second.action,
            time: this.second.time
          }
        ]
      }

      this.$mdDialog.hide(survey);

    }
  }
}
