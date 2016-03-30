/// <reference path="_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        angular
            .module('dashboard', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'ngRoute', 'users', 'md.data.table', 'mdPickers'])
            .controller('MainController', dashboard.MainController)
            .config(function ($mdThemingProvider, $mdIconProvider, $routeProvider, $locationProvider) {
            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("phone", "./assets/svg/phone.svg", 512)
                .icon("slack", "./assests/svg/slack.svg", 512);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
            $routeProvider
                .when("/", {
                templateUrl: "/dist/view/dashboard/index.html",
                controller: "MainController as vm"
            });
            $locationProvider.hashPrefix('!');
        });
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=boot.js.map