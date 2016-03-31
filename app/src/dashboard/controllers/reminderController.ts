/// <reference path="../_all.ts" />

module app.dashboard {

  export class ReminderController {

    static $inject = ['$mdDialog', 'userService'];

    constructor(private $mdDialog,
                private userService
                ){
                  this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                  this.selected = [];
                  this.author = this.userService.get();
                  this.author = this.author.coach.id;

                  this.assignee = this.userService.selectedUser;
                  this.assignee = this.assignee.id;
                }



    addReminder($event) {

    }


    author: any;
    assignee: any;

    time: any;
    selected: any;
    reminder: any;
    response: string = "";

    start: any;
    days: any;

    toggle(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    };

    exists(item, list) {
      return list.indexOf(item) > -1;
    };

    toggleAll() {
      if (this.selected.length === this.days.length) {
        this.selected = [];
      } else if (this.selected.length === 0 || this.selected.length > 0) {
        this.selected = this.days.slice(0);
      }
    };

    isChecked() {
      return this.selected.length === this.days.length;
    };

    isIndeterminate() {
      return (this.selected.length !== 0 &&
          this.selected.length !== this.days.length);
    };

    close(): void {
      this.$mdDialog.cancel();
    }

    save(): void {

      console.log(this.time);

      var dates = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }

      if(this.selected.indexOf('Sun') != -1){
        dates.sunday = true;
      }
      if(this.selected.indexOf('Mon') != -1) {
        dates.monday = true;
      }
      if(this.selected.indexOf('Tues') != -1) {
        dates.tuesday = true;
      }
      if(this.selected.indexOf('Wed') != -1) {
        dates.wednesday = true;
      }
      if(this.selected.indexOf('Thurs') != -1) {
        dates.thursday = true;
      }
      if(this.selected.indexOf('Fri') != -1) {
        dates.friday = true;
      }
      if(this.selected.indexOf('Sat') != -1) {
        dates.saturday = true;
      }

      var reminder = {
        title: this.reminder,
        // Will this be set to server time or user's local time?
        timeOfDay: this.time.toLocaleTimeString(),
        selectedDates: this.selected,
        daysOfTheWeek: dates,
        author: this.author,
        assignee: this.assignee
      }

      console.log(reminder);

      this.$mdDialog.hide(reminder);

    }
  }
}
