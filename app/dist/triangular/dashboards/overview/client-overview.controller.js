(function() {
  'use strict';

  angular
    .module('dashboards')
    .controller('ClientOverviewController', ClientOverviewController);

    ClientOverviewController.$inject = ['user'];

    function ClientOverviewController(user) {
      var vm = this;
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
        order: 'username',
        limit: 10,
        page: 1
      }

      function contents(clients) {
        var contents = [];
        for(var i = 0; i < clients.length; i++) {
          var current = {
            thumb: clients[i].slack.img,
            name: clients[i].username
          }
          contents.push(current);
        }
        return contents;
      }
    }

})();
