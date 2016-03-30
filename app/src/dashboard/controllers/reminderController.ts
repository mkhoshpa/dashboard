/// <reference path="../_all.ts" />

module app.dashboard {

  export class ReminderController {

    static $inject = ['$mdDialog', '$mdpDatePicker', '$mdpTimePicker', 'userService'];

    constructor(private $mdDialog,
                private $mdpDatePicker,
                private $mdpTimePicker,
                private userService){}

    addReminder($event) {

    }

    close(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide();
    }
  }
}
