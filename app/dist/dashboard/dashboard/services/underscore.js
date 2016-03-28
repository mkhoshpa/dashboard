/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var Underscore = (function () {
            function Underscore($window) {
                this.$window = $window;
                return this._ = window['_'];
            }
            Underscore.$inject = ['$window'];
            return Underscore;
        }());
        dashboard.Underscore = Underscore;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=underscore.js.map