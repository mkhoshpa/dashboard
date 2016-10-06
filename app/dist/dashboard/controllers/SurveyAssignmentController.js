




var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveyAssignmentController = (function () {
            function  SurveyAssignmentController($mdDialog, userService, selected) {
                console.log(JSON.stringify(selected));
                this.$mdDialog = $mdDialog;
                this.userService = userService;

                if(selected){
                    this.questions= selected.ass.surveyTemplateId.questions;
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
                for(var i=0;i<this.questions.length;i++){
                    this.questions[i].answer =this.note ;
                }




                var note = {

                    questions: this.questions,
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