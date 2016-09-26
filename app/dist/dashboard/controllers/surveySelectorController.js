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
                this.repeat = false;
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
                var idx =  this.days.indexOf(item);
                idx=idx+"";
                var index = list.indexOf(idx);
                if(index === -1){
                    this.selectedDays.push(idx);

                }
                else{
                    this.selectedDays.splice(index,1);
                }
            }
            ;
            SurveySelectorController.prototype.exists = function (item, list) {

                var index =  this.days.indexOf(item);
                var answer = false;
                for (var i = 0; i < list.length; i++) {
                    if(index == list[i]){
                        answer = true;
                    }
                }
                return answer;
            };
            ;
            SurveySelectorController.prototype.toggleAll = function () {
                if (this.selectedDays.length == 7) {

                    this.selectedDays = [];
                }
                else  {
                    this.selectedDays = [0,1,2,3,4,5,6];
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
                var hour = this.time.getHours();
                var minute = this.time.getMinutes();
                var day = this.time.getDay();
                console.log(this.time);
                console.log(day);

                var dateToday = new Date();
                dateToday.setHours(hour);
                dateToday.setMinutes(minute);
                dateToday.setSeconds('00');
                //dateToday.set
                console.log("today date")

                console.log(dateToday);




                var surveyInfo = {


                  repeat: this.repeat,
                  timeOfDay: dateToday,
                  hour: hour,
                  minute: minute,
                  selectedDates: this.selectedDays,

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
