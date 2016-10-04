




var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveyAssignmentController = (function () {
            function  SurveyAssignmentController($mdDialog, userService, selected) {
                console.log(selected);
                this.$mdDialog = $mdDialog;
                this.userService = userService;

                if(selected){
                    this.selected = selected.ass;
                    this.assignment= selected.ass._id;
                    this.reminder = selected.ass.reminderId;
                    this.userId = selected.ass.userId;
                }
                if(selected.res.questions){
                    this.note = selected.res.questions[0].answer;
                }


            }

            SurveyAssignmentController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };

            SurveyAssignmentController.prototype.save = function () {
                console.log("Getting somewhere");
                var questions=[];
                var question = {answer:this.note};
                questions.push(question);


                var note = {

                    questions: questions,
                    assignment: this.assignment,
                    // assignee: this.assignee.id,
                    reminderId: this.reminder,
                    userId: this.userId
                }
                console.log(note);
                this.$mdDialog.hide(note);
            };

            SurveyAssignmentController.$inject = ['$mdDialog', 'userService', 'selected'];
            return SurveyAssignmentController;
        }());
        dashboard.SurveyAssignmentController = SurveyAssignmentController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));