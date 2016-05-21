(function() {
  'use strict';

  angular
    .module('dashboard')
    .directive('status', status);

    function status () {

      var directive = {
        restrict: 'E',
        transculde: true,
        templateUrl: "dist/view/dashboard/rostr/status/status.tmpl.html",
        scope: {
          selected: '='
        },
        link: linkFunc,
        controller: "StatusController",
        controllerAs: 'vm',
        bindToController:true
      }

      return directive;

      function linkFunc(scope, el, attr, ctrl) {

      }
    }

})();
