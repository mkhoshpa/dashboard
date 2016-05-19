/// <reference path="../_all.ts" />
var app;
(function (app) {
  var dashboard;
  (function (dashboard) {
    var MessageController = (function () {
      function MessageController($http) {
        this.$http = $http;
      };
      MessageController.prototype.submit = function () {
        console.log('Begin submit');
        this.$http.post('/api/message/send/+15064261732/' + message.content);
      };
      MessageController.$inject = ['$http'];

      return MessageController;
    }());
      dashboard.MessageController = MessageController;
  })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sorceMappingURL=messageController.js.map
