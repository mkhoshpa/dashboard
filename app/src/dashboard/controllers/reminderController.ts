/// <reference path="../_all.ts" />

module app.dashboard {

  export class ReminderController {

    static $inject = ['$mdDialog', 'userService'];

    constructor(private $mdDialog,
                private $mdpDatePicker,
                private $mdpTimePicker,
                private userService,
                private chips
                ){
                  this.items = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                  this.selected = [];
                }



    addReminder($event) {

    }

    items: any;
    selected: any;

    toggle(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    };

    exists(item, list) {
      return list.indexOf(item) > -1;
    };

    close(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide();
    }
  }
}
