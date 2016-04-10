/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveyController = (function () {
            function SurveyController($mdDialog, userService, $http, selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.$http = $http;
                this.selected = selected;
                this.options = [
                    'Anxiety', 'Stress', 'Weightloss', 'Productivity'
                ];
                this.green = '#66BB6A';
                this.yellow = '#FDD835';
                this.red = '#e53935';
                this.author = this.userService.get();
                if (this.author.role == "coach") {
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
                if (selected) {
                    if (selected.goals.length > 1) {
                        this.another = true;
                        this.first = {
                            goal: selected.goals[0].goal,
                            action: selected.goals[0].reminder.title,
                            time: new Date(selected.goals[0].reminder.timeOfDay)
                        };
                        this.second = {
                            goal: selected.goals[1].goal,
                            action: selected.goals[1].reminder.title,
                            time: new Date(selected.goals[1].reminder.timeOfDay)
                        };
                    }
                    else {
                        this.first = {
                            goal: selected.goals[0].goal,
                            action: selected.goals[0].reminder.title,
                            time: new Date(selected.goals[0].reminder.timeOfDay)
                        };
                    }
                }
            }
            SurveyController.prototype.editSurvey = function (survey) {
                console.log('here');
            };
            SurveyController.prototype.close = function () {
                this.$mdDialog.cancel();
            };
            SurveyController.prototype.save = function () {
                var survey;
                if (this.another) {
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
                    };
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
                    };
                }
                this.$mdDialog.hide(survey);
            };
            SurveyController.$inject = ['$mdDialog', 'userService', '$http', 'selected'];
            return SurveyController;
        }());
        dashboard.SurveyController = SurveyController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=surveyController.js.map