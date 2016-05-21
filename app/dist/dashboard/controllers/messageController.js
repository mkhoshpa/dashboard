/// <reference path="../_all.ts" />
var app;
(function (app) {
  var dashboard;
  (function (dashboard) {
    var MessageController = (function () {
      function MessageController($http, userService) {
        this.$http = $http;
        this.userService = userService;
      };
      MessageController.prototype.submit = function () {
        console.log('Begin submit');
        this.$http.post('/api/message/send/+15064261732/' + message.content);
      };
      MessageController.$inject = ['$http', 'userService'];

      return MessageController;
    }());
      dashboard.MessageController = MessageController;
  })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sorceMappingURL=messageController.js.map
