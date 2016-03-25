/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var DashboardController = (function () {
            function DashboardController(userService, $mdBottomSheet) {
                this.userService = userService;
                this.$mdBottomSheet = $mdBottomSheet;
                this.actions = [
                    { name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg' },
                    { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg' },
                    { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg' },
                    { name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg' }
                ];
                //this.user = userService.selectedUser;
            }
            DashboardController.prototype.submitContact = function (action) {
                this.$mdBottomSheet.hide(action);
            };
            DashboardController.$inject = ['userService', '$mdBottomSheet'];
            return DashboardController;
        }());
        dashboard.DashboardController = DashboardController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=contactPanelController.js.map