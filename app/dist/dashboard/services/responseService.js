var app;
(function (app) {
  var dashboard;
  (function (dashboard) {
    var ResponseService = (function () {
      function ResponseService($window, $http) {

      }
      ResponseService.prototype.get = function (options) {
        return 'Fish';
      };
      ResponseService.$inject = ['$window', '$http'];
      return ResponseService
    }());
    // users.UserService = UserService;
  })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
