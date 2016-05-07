// Assume we have a $nutrition service that provides an API for communicating with the server

angular.module('app').controller('tableController', ['$nutrition', '$scope', function ($nutrition, $scope) {
  'use strict';

  $scope.selected = [];

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  function success(desserts) {
    $scope.desserts = desserts;
  }

  $scope.getDesserts = function () {
    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
  };

}]);
