(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('ClientOverviewController', ClientOverviewController);

    ClientOverviewController.$inject = ['user', '$scope'];

    function ClientOverviewController(user, $scope) {
      var vm = this;
      vm.bookmark;
      vm.user = user.current;
      vm.clients = vm.user.clients;
      //vm.contents = contents(vm.clients);
      vm.selected = [];

      vm.columns = {
           avatar: '',
           name: 'Name',
           status: 'Status',
           recent: 'Most Recent Activity'
          //  id: 'TABLE.COLUMNS.ID'
       };



      vm.query = {
        filter: '',
        order: 'username',
        limit: 10,
        page: 1
      }

      vm.removeFilter = function () {
        vm.filter.show = false;
         vm.query.filter = '';

         if(vm.filter.form.$dirty) {
           vm.filter.form.$setPristine();
         }
      };

      // $scope.$watch('vm.query.filter', function (newValue, oldValue) {
      //   if(!oldValue) {
      //     vm.bookmark = vm.query.page;
      //   }
      //
      //   if(newValue !== oldValue) {
      //     vm.query.page = 1;
      //   }
      //
      //   if(!newValue)  {
      //     vm.query.page = vm.bookmark;
      //   }
      //
      //   vm.getClients();
      // });

      // Get list of clients that match query
      function getClients() {

      }

      // Apply the getClients result to vm
      function success(clients) {
        vm.clients = clients
      }

    }

})();
