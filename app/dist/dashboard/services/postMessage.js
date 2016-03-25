var Dashboard;
(function (Dashboard) {
    var PostMessage = (function () {
        function PostMessage(userService, $mdDialog) {
            this.userService = userService;
            this.$mdDialog = $mdDialog;
            this.user = userService.selectedUser;
        }
        PostMessage.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        PostMessage.prototype.save = function () {
            this.$mdDialog.hide();
        };
        PostMessage.$inject = ['userService', '$mdDialog'];
        return PostMessage;
    }());
    Dashboard.PostMessage = PostMessage;
})(Dashboard || (Dashboard = {}));
