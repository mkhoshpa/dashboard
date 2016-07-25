// var app;
// (function (app) {
//     var response;
//     (function (response) {
//         var ResponseService = (function () {
//             function ResponseService($window, $q, $http) {
//                 this.$window = $window;
//                 this.$q = $q;
//                 this.$http = $http;
//             }
//
//
//           ResponseService.prototype.surveyAssignments = function (user, cb) {
//             var _this = this;
//             var self = this;
//
//
//             if(user){
//               console.log('sadasds');
//               _this.$http.get('/api/assignment/selectedUser/'+ user._id).then(function(response){
//                 console.log(response);
//                 console.log("reas");
//
//                   cb(response);
//
//
//
//               })
//             }
//           }
//
//
//
//
//
//
//             ResponseService.$inject = ['$window', '$q', '$http'];
//             return ResponseService;
//         }());
//         response.ResponseService = ResponseService;
//     })(response = app.response|| (app.response = {}));
// })(app || (app = {}));
