/// <reference path="_all.ts" />

module app.dashboard {

  angular
    .module('dashboard', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'ngRoute', 'users', 'md.data.table','mdPickers'])
    .controller('MainController', MainController)
    .config(($mdThemingProvider : angular.material.IThemingProvider,
             $mdIconProvider    : angular.material.IIconProvider,
             $routeProvider: ng.route.IRouteProvider,
             $locationProvider: ng.ILocationProvider) => {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512)
            .icon("slack"      , "./assests/svg/slack.svg"      , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

        $routeProvider
        .when("/",
        {
          templateUrl: "/dist/view/dashboard/index.html",
          controller: "MainController as vm"
        })

        $locationProvider.hashPrefix('!');
    });

}
