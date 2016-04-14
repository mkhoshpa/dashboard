(function() {
    'use strict';

    angular
        .module('app', [
            'triangular',
            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages',
            'ngMaterial',  'ui.router', 'pascalprecht.translate', 'LocalStorageModule',
            'googlechart',   'chart.js', 'linkify', 'ui.calendar', 'angularMoment',
            'textAngular', 'hljs', 'md.data.table', angularDragula(angular),
            'dashboards', 'common'
        ])
        // create a constant for languages so they can be added to both triangular & translate
        .constant('APP_LANGUAGES', [{
            name: 'English',
            key: 'en'
        },{
            name: 'French',
            key: 'fr'
        }])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  'http://triangular-api.oxygenna.com/'
        });
})();
