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
      goal: any,
      action: any,
      time: any,
    }

    second: {
      goal: any,
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
      var survey: any;
      if(this.another) {
        survey = {
          author: this.author,
          assignee: this.assignee,
          goals: [
            {
              goal: this.first.goal,
              action: this.first.action,
              time: this.first.time,
            },
            {
              goal: this.second.goal,
              action: this.second.action,
              time: this.second.time
            }
          ]
        }
      }
      else {
        survey = {
          author: this.author,
          assignee: this.assignee,
          goals: [
            {
              goal: this.first.goal,
              action: this.first.action,
              time: this.first.time,
            }
          ]
        }
      }

      this.$mdDialog.hide(survey);

    }
  }
}
