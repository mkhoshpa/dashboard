var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var SurveyController = (function () {
            function SurveyController(userService, $mdSidenav, $mdBottomSheet, $mdToast, $mdDialog, $mdMedia, $http) {
                this.userService = userService;
                this.$mdSidenav = $mdSidenav;
                this.$mdBottomSheet = $mdBottomSheet;
                this.$mdToast = $mdToast;
                this.$mdDialog = $mdDialog;
                this.$mdMedia = $mdMedia;
                this.$http = $http;

            SurveyController.prototype.popUp = function($event){
                console.log("Here");
            };

            SurveyController.$inject = ['userService', '$mdSidenav', '$mdBottomSheet',
                '$mdToast', '$mdDialog', '$mdMedia', '$http'];
            return SurveyController;
        }());
        dashboard.SurveyController = SurveyController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
