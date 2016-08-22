var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveySelectorController = (function () {
            function SurveySelectorController($mdDialog, userService, $http) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.$http = $http;
                this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                this.selectedDays = [];
                this.author = this.userService.get();
                if (this.author.role == "coach") {
                    this.author = this.author.id;
                    //this.assignee = this.userService.selectedUser;
                    //this.assignee = this.assignee._id;
                }
                else if (this.author.role == "user") {
                    this.author = this.author.id;
                    this.assignee = this.author;
                }


            }
            /*
            SurveySelectorController.prototype.editSurvey = function (survey) {
                console.log('here');
            };
            */
            SurveySelectorController.prototype.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1)
                    list.splice(idx, 1);
                else
                    list.push(item);
            };
            ;
            SurveySelectorController.prototype.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };
            ;
            SurveySelectorController.prototype.toggleAll = function () {
                if (this.selectedDays.length === this.days.length) {
                    this.selectedDays = [];
                }
                else if (this.selectedDays.length === 0 || this.selectedDays.length > 0) {
                    this.selectedDays = this.days.slice(0);
                }
            };
            ;
            SurveySelectorController.prototype.isChecked = function () {
                return this.selectedDays.length === this.days.length;
            };
            ;
            SurveySelectorController.prototype.isIndeterminate = function () {
                return (this.selectedDays.length !== 0 &&
                    this.selectedDays.length !== this.days.length);
            };



            SurveySelectorController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };



            SurveySelectorController.prototype.save = function () {
              var dates = {
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false,
                  sunday: false
              };
              var days = [];
              var dateToday = new Date();

              var hour = this.time.getHours();
              var minute = this.time.getMinutes();

              dateToday.setHours(hour);
              dateToday.setMinutes(minute);
              dateToday.setSeconds('00');

              console.log(dateToday);

              if (this.selectedDays.indexOf('Sun') != -1) {
                  dates.sunday = true;
                  days.splice(this.days.length,0,0);
              }
              if (this.selectedDays.indexOf('Mon') != -1) {
                  dates.monday = true;
                  days.splice(this.days.length,0,1);
              }
              if (this.selectedDays.indexOf('Tues') != -1) {
                  dates.tuesday = true;
                  days.splice(this.days.length,0,2);
              }
              if (this.selectedDays.indexOf('Wed') != -1) {
                  dates.wednesday = true;
                  days.splice(this.days.length,0,3);
              }
              if (this.selectedDays.indexOf('Thurs') != -1) {
                  dates.thursday = true;
                  days.splice(this.days.length,0,4);
              }
              if (this.selectedDays.indexOf('Fri') != -1) {
                  dates.friday = true;
                  days.splice(this.days.length,0,5);
              }
              if (this.selectedDays.indexOf('Sat') != -1) {
                  dates.saturday = true;
                  days.splice(this.days.length,0,6);
              }




                var surveyInfo = {

                  days: days,
                  repeat: this.repeat,
                  timeOfDay: dateToday,
                  hour: hour,
                  minute: minute,
                  selectedDates: this.selectedDays,
                  daysOfTheWeek: dates,
                  author: this.author

                };
                console.log(surveyInfo);

                this.$mdDialog.hide(surveyInfo);
            };






            SurveySelectorController.$inject = ['$mdDialog', 'userService', '$http'];
            return SurveySelectorController;
        }());
        dashboard.SurveySelectorController = SurveySelectorController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=SurveySelectorController.js.map
