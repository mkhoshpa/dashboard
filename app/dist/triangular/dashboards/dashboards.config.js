(function() {
    'use strict';

    angular
        .module('dashboards')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('dashboards');
        $stateProvider
        // .state('fitpath.client-overview', {
        //     url: '/',
        //     templateUrl: 'dashboards/overview/client-overview.tmpl.html',
        //     controller: 'ClientOverviewController',
        //     controllerAs: 'vm'
        // });
        .state('triangular.admin-default.client-overview', {
            url: '/',
            templateUrl: 'dashboards/overview/client-overview.tmpl.html',
            controller: 'ClientOverviewController',
            controllerAs: 'vm'
        })
        // .state('triangular.admin-default.dashboard-analytics', {
        //     url: '/analytics',
        //     templateUrl: 'dashboards/analytics/dashboard-analytics.tmpl.html',
        //     controller: 'DashboardAnalyticsController',
        //     controllerAs: 'vm'
        // })
        // .state('triangular.admin-default.dashboard-widgets', {
        //     url: '/widgets',
        //     templateUrl: 'dashboards/widgets.tmpl.html'
        // })
        // .state('triangular.admin-default.dashboard-social', {
        //     url: '/social',
        //     templateUrl: 'dashboards/social/dashboard-social.tmpl.html',
        //     controller: 'DashboardSocialController',
        //     controllerAs: 'vm'
        // })
        // .state('triangular.admin-default.dashboard-draggable', {
        //     url: '/dashboards/draggable-widgets',
        //     templateUrl: 'dashboards/dashboard-draggable.tmpl.html',
        //     controller: 'DashboardDraggableController',
        //     controllerAs: 'vm'
        // });

        // triMenuProvider.addMenu({
        //     name: 'MENU.DASHBOARDS.DASHBOARDS',
        //     icon: 'zmdi zmdi-home',
        //     type: 'dropdown',
        //     priority: 2.1,
        //     children: [{
        //         name: 'MENU.DASHBOARDS.ANALYTICS',
        //         state: 'triangular.admin-default.dashboard-analytics',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.GENERAL',
        //         state: 'triangular.admin-default.dashboard-general',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.WIDGETS',
        //         state: 'triangular.admin-default.dashboard-widgets',
        //         type: 'link'
        //     },{
        //         name: 'MENU.DASHBOARDS.DRAGGABLE',
        //         state: 'triangular.admin-default.dashboard-draggable',
        //         type: 'link'
        //     }]
        // });

        triMenuProvider.addMenu({
          name: 'Overview',
          icon: 'zmdi zmdi-home',
          type: 'link',
          state: 'triangular.admin-default.client-overview',
        });
    }
})();
