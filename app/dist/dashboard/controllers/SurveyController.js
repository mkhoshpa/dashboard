var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveyController = (function () {
            function SurveyController($mdDialog, userService, $http) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.$http = $http;
                this.options = [
                    'Anxiety', 'Stress', 'Weightloss', 'Productivity'
                ];
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
            }
            SurveyController.prototype.close = function () {
                this.$mdDialog.cancel();
            };
            SurveyController.prototype.save = function () {
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
                };
                this.$mdDialog.hide(survey);
            };
            SurveyController.$inject = ['$mdDialog', 'userService', '$http'];
            return SurveyController;
        }());
        dashboard.SurveyController = SurveyController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=surveyController.js.map