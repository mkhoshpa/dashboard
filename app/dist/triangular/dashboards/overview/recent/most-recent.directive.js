(function() {
  'use strict';

  angular
    .module('dashboards')
    .directive('mostRecent', mostRecent);

    function mostRecent () {
      var directive = {
        restrict: 'E',
        transculde: true,
        templateUrl: "dashboards/overview/recent/most-recent.tmpl.html",
        scope: {
          selected: '='
        },
        link: linkFunc,
        controller: "MostRecentController",
        controllerAs: 'vm',
        bindToController:true
      }

      return directive;

      function linkFunc(scope, el, attr, ctrl) {

      }

    }

})();
