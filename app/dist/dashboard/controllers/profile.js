/**
 * Created by mehrgan on 18/10/16.
 */
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var userSelected;
        var userCoach;
        var scope;
        var ProfileController = (function () {
            function ProfileController($scope, userService, $mdSidenav, $mdBottomSheet, $mdToast, $mdDialog, $mdMedia, $http) {
                this.userService = userService;
                this.$mdSidenav = $mdSidenav;
                this.$mdBottomSheet = $mdBottomSheet;
                this.$mdToast = $mdToast;
                this.$mdDialog = $mdDialog;
                this.$mdMedia = $mdMedia;
                this.$http = $http;
                this.show = "show";
                console.log("inside profile");
            }






            ProfileController.$inject = ['$scope', 'userService', '$mdSidenav', '$mdBottomSheet',
                '$mdToast', '$mdDialog', '$mdMedia', '$http'];
            return ProfileController;
        }());
        dashboard.ProfileController = ProfileController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));