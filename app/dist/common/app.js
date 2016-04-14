(function() {
  'use strict';

  angular
    .module('common', [])
    .service('user', user);

    function user() {
      var current = window.user;
      var service = {
        current: current
      }
      return service;

      // Redundant
      function clients() {
        return current.clients;
      }

    }
})();
