/// <reference path="../_all.ts" />

module app.dashboard {

  export class SurveyController {

    static $inject = ['$mdDialog', 'userService', '$http', 'selected'];

    user: any;
    assignee: any;
    author: any;

    options = [
      'Anxiety', 'Stress', 'Weightloss', 'Productivity'
    ]

    first: {
      goal: any,
      action: any,
      time: any,
      reminder: any,
    }

    second: {
      goal: any,
      action: any,
      time: any,
      reminder: any,
    }

    id: any;

    status: any;

    green = '#66BB6A';
    yellow = '#FDD835';
    red = '#e53935';

    another: any;

    constructor(private $mdDialog,
                private userService,
                private $http,
                private selected
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

                  if(selected) {
                    this.id = selected._id;
                    if(selected.goals.length > 1) {
                      this.first = {
                        goal: selected.goals[0].goal,
                        action:selected.goals[0].reminder.title,
                        time: new Date(selected.goals[0].reminder.timeOfDay),
                        reminder: selected.goals[0].reminder
                      }

                      this.second = {
                        goal: selected.goals[1].goal,
                        action: selected.goals[1].reminder.title,
                        time: new Date(selected.goals[1].reminder.timeOfDay),
                        reminder: selected.goals[1].reminder
                      }
                    }
                    else {
                      this.first = {
                        goal: selected.goals[0].goal,
                        action: selected.goals[0].reminder.title,
                        time: new Date(selected.goals[0].reminder.timeOfDay),
                        reminder: selected.goals[0].reminder

                      }
                    }
                  }
                }

    editSurvey(survey) {
      console.log('here');
    }

    close(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      var survey = {};

      if(this.selected) {
        this.first.reminder.title = this.first.action;
        this.first.reminder.timeOfDay = this.first.time;
        this.second.reminder.title = this.second.action;
        this.second.reminder.timeOfDay = this.second.time;
      }

      if(this.another || this.selected.goals.length > 1) {
        survey = {
          _id: this.id,
          author: this.author,
          assignee: this.assignee,
          goals: [
            {
              goal: this.first.goal,
              action: this.first.action,
              time: this.first.time,
              reminder: this.first.reminder
            },
            {
              goal: this.second.goal,
              action: this.second.action,
              time: this.second.time,
              reminder: this.second.reminder
            }
          ]
        }
      }
      else {
        survey = {
          _id: this.id,
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
