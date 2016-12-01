var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var NoteController = (function () {
            function NoteController($mdDialog, $http, userService , selected,coach) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.selected = selected;
                this.$http=$http;
                console.log(this.selected);
                //this.author = this.userService.get();
                this.assignee = this.userService.selectedUser;
                this.selectedUsers=[];
                this.selectedUsersToRemove=[];
                this.coach=coach;
                console.log(this.coach);

                if(selected){
                  this._id = selected._id;
                  this.note = selected.body;
                  this.members=[];
                  var _this=this;

                    this.selected.memebers.forEach(function (userId) {
                      _this.coach.clients.forEach(function (client) {
                          if(userId== client._id){
                              _this.members.push(client);
                          }
                      })

                  })
                }


            }
            NoteController.prototype.addToGroup=function ($event) {
                var _this=this;
                console.log(_this.selectedUsers);
                console.log(_this.selected.memebers);

                var list = _this.selectedUsers;
                //console.log(_this.selected.memebers);
               list = list.concat(_this.selected.memebers);
                console.log(list);

            this.$http.post('/api/group/addClient/' + _this.selected._id,list)
                .then(function successCallback(success) {
                    console.log(success);
                    _this.selected.memebers = list;
                    _this.members=[];
                    _this.selected.memebers.forEach(function (userId) {
                        _this.coach.clients.forEach(function (client) {
                            if(userId== client._id){
                                _this.members.push(client);
                            }
                        })

                    })
                    _this.selectedUsers=[];
                    _this.selectedUsersToRemove=[];



                });
            };
            NoteController.prototype.toggle2 = function (item) {
                    //console.log(JSON.stringify(vm.user.clients));
                    //console.log(JSON.stringify(vm.selectSurveyUser));
                console.log(this.selected.memebers);
                var idi = item._id+'';
                console.log(idi);
                console.log(this.selected.memebers.indexOf(idi));
                var bool= !(this.selected.memebers.indexOf(idi)> -1);
                console.log(bool);
                if(!(this.selected.memebers.indexOf(idi)> -1)){
                    var clients = [];
                    this.coach.clients.forEach(function (client) {
                        clients.push(client);
                    });
                    //console.log(JSON.stringify(clients));

                    var idx = this.selectedUsers.indexOf(item._id);
                    if (idx > -1){
                       this.selectedUsers.splice(idx, 1);}
                    else{
                        this.selectedUsers.push(item._id);}
                    //console.log(JSON.stringify(vm.selectSurveyUser));
                    //console.log(JSON.stringify(vm.user.clients));
                    //console.log(JSON.stringify(clients));
                    console.log(this.selectedUsers);

                    this.coach.clients = clients;
                }


                };

            NoteController.prototype.toggleRemove = function (item) {
                //console.log(JSON.stringify(vm.user.clients));
                //console.log(JSON.stringify(vm.selectSurveyUser));
                console.log(this.selected.memebers);
                var idi = item._id+'';
                console.log(idi);
                console.log(this.selected.memebers.indexOf(idi));
                var bool= !(this.selected.memebers.indexOf(idi)> -1);
                console.log(bool);
                    var clients = [];
                    this.coach.clients.forEach(function (client) {
                        clients.push(client);
                    });
                    //console.log(JSON.stringify(clients));

                    var idx = this.selectedUsersToRemove.indexOf(item._id);
                    if (idx > -1){
                        this.selectedUsersToRemove.splice(idx, 1);}
                    else{
                        this.selectedUsersToRemove.push(item._id);}
                    //console.log(JSON.stringify(vm.selectSurveyUser));
                    //console.log(JSON.stringify(vm.user.clients));
                    //console.log(JSON.stringify(clients));
                    console.log(this.selectedUsersToRemove);

                    this.coach.clients = clients;



            };

            NoteController.prototype.removeFromGroup = function ($event) {


                console.log('remove from group hit');
                console.log(this.selectedUsersToRemove);
                var _this=this;
                this.$http.post('/api/group/removeFromGroup/' + _this.selected._id,this.selectedUsersToRemove)
                    .then(function successCallback(success) {
                        console.log(success);
                        var newMembers = [];
                        _this.selected.memebers.forEach(function (member) {
                           if(!(_this.selectedUsersToRemove.indexOf(member)>-1)){
                               newMembers.push(member);
                           }
                        });
                        _this.selectedUsersToRemove=[];
                        _this.selected.memebers=newMembers;
                        _this.members=[];
                        _this.selectedUsers=[];

                        _this.selected.memebers.forEach(function (userId) {
                            _this.coach.clients.forEach(function (client) {
                                if(userId== client._id){
                                    _this.members.push(client);
                                }
                            })

                        })



                    });



            };

                NoteController.prototype.isChecked1 = function () {
                //console.log(vm.selectSurveyUser);
                //console.log(vm.user.clients);

                return this.selectedUsers.length == this.coach.clients.length;
            };
            NoteController.prototype.toggleAll = function () {
                if (this.selectedColumns.length === vm.columns.length) {
                    this.selectedColumns = [];
                }
                else if (this.selectedColumns.length === 0 || this.selectedColumns.length > 0) {
                    this.selectedColumns = vm.columns.slice(0);
                }
            };
            NoteController.prototype.exists = function (item, list) {
                //console.log(this.selected.memebers);
                //console.log(item);

                return (list.indexOf(item._id+'') > -1 || (this.selected.memebers.indexOf(item._id+'')> -1) );
            };
            NoteController.prototype.existsRemove = function (item, list) {
                //console.log(this.selected.memebers);
                //console.log(item);

                return (list.indexOf(item._id+'') > -1 );
            };
            NoteController.prototype.cancel = function () {
              this.$mdDialog.cancel();
            };

            NoteController.prototype.save = function () {
              console.log("Getting somewhere");

              var note = {
                _id: this._id,
                body: this.note,
                author: this.author.id,
                assignee: this.assignee.id
              }
              console.log(note);
              this.$mdDialog.hide(note);
            };
            NoteController.prototype.cancelGroup = function () {
                this.$mdDialog.cancel();
            };

            NoteController.prototype.saveGroup = function () {
                console.log("Getting somewhere");

                var group = {
                   name:this.groupName

                };
                console.log(group);
                this.$mdDialog.hide(group);
            };


            NoteController.$inject = ['$mdDialog','$http', 'userService', 'selected','coach'];
            return NoteController;
        }());
        dashboard.NoteController = NoteController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
