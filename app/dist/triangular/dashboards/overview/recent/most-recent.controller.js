(function() {
  'use strict';

  angular
    .module('dashboards')
    .controller('MostRecentController', MostRecentController);

    MostRecentController.$inject = ['$scope', '$mdDialog'];

    function MostRecentController($scope,$mdDialog) {

      var vm = this;

      vm.read = function (response, ev) {
        console.log(response)
          $mdDialog.show(
            $mdDialog.alert()
               .parent(angular.element(document.querySelector('#popupContainer')))
               .clickOutsideToClose(true)
               .title('hello')
               .textContent(response.text)
               .ariaLabel('Alert Dialog Demo')
               .ok('Got it!')
               .targetEvent(ev)
           );
      }

      vm.hasResponse = function(response) {
        if(response == null || response == undefined)
          return true;
        else
          return false;
      }

      // Visit Next Response
      vm.next = function() {

      }

    }

  })();
