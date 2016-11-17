/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var userSelected;
        var userCoach;
        var scope;
        var MainController = (function () {
            function MainController($scope, userService, $mdSidenav, $mdBottomSheet, $mdToast, $mdDialog, $mdMedia, $http) {
                this.userService = userService;
                this.$mdSidenav = $mdSidenav;
                this.$mdBottomSheet = $mdBottomSheet;
                this.$mdToast = $mdToast;
                this.$mdDialog = $mdDialog;
                this.$mdMedia = $mdMedia;
                this.$http = $http;
                this.searchText = '';
                this.reminders = [];
                this.responses = [];
                this.tabIndex = 1;
                this.selected = null;
                this.newNote = new dashboard.Note('', null);
                this.newReminder = new dashboard.Reminder('', null);
                this.convoReminderResponse = [];
                this.convoSurveyResponse = [];
                this.surveyTemplates = [];
                this.timeZoneFromGMT=-3;
                this.show="show";
                //Survey stuff
                this.questions1 = [
                 {
                   display: "Yes/No",
                   value: "YESNO"
                 },
                 {
                   display:"Scale from 1 to 5",
                   value:"SCALE"
                 },
                 {
                     display:"Written Answer",
                     value:"WRITTEN"
                }];

                //this.questions1 = [{type: "Yes/No"},{type:"Scale from 1 to 5"},{type:"Written Answer"}];
                this.counter = 0;
                this.now =new Date();

                this.selectSurveyUser = [];

                //pipelineStage array
                this.pipelineOptions = [{type: "lead"}, {type: "trial"}, {type: "active-client"}, {type: "previous-client"},{type: "archived"},{type: "NA"} ];

                var self = this;
                this.user = this.userService.get();
                userCoach = this.user;
                if (this.user.role == "user") {
                    self.selected = this.user;
                }
                else if (this.user.role == "coach") {
                    this.clients = this.user.clients;
                    if(this.clients) {
                        //this.selected = this.user;
                        self.selected = this.clients[0];
                    }else{this.selected = this.user;
                        console.log("empty");
                    }
                }
                self.userService.selectedUser = self.selected;
                userSelected = self.userService.selectedUser;
                scope = $scope;
                this._ = window['_'];


                this.newSurvey = {

                  title:null,
                  author:this.user._id,
                  questions:[
                  {
                    question:null,
                    header:null,
                    type:null
                  }
                  ]
                };




            }
            //console.log(JSON.stringify(this));
            // convertToUsers(slack: any[]) {
            //   console.log('convertToUsers: ' + this.slack);
            //   this.userService.
            // }

            //create a different controller
            MainController.prototype.testing = function () {
              console.log(this.changeSurvey);
            }


            MainController.prototype.testing = function () {
              console.log(this.changeSurvey);
            }

            MainController.prototype.setFormScope = function (scope) {
                this.formScope = scope;
            };


            MainController.prototype.anotherQuestion = function(survey){
              var _this = this;
              var self = this;
              console.log("here");
              console.log(survey);
              var question = {
                header:null,
                questions:null,
                type:null
              };
              //does both for newSurvey and changeSurvey
              survey.questions.push(question);

              console.log(survey.questions);
              self.openToast("Added Question");
            }

            MainController.prototype.removeQuestion = function (index, survey) {
              var _this = this;
              var self = this;
              console.log("here");
              console.log(survey);
              //does both remove for newSurvey and changeSurvey
              if(index > -1){
                survey.questions.splice(index, 1);
              }

              console.log(survey.questions);
              self.openToast("Removed Question");
            }






            MainController.prototype.cancelChangeSurvey = function(){
              var _this = this;
              var self = this;
              //need to refresh the page
              this.changeSurvey = "new";
              self.openToast("Editing Cancel");
            }

            MainController.prototype.saveChangeSurvey = function(){
              var _this = this;
              var self = this;
              console.log("hey");
              console.log(this.changeSurvey);

              _this.$http.post('/api/surveyTemplate/update/' + this.changeSurvey._id, this.changeSurvey).then(function successCallback(response) {
                  console.log(response.data);
                  //this.user.surveyTemplates.push(response.data);
                  console.log(this.user.surveyTemplates);

                  for(i = 0; i < this.user.surveyTemplates.length; i++){
                    if(this.user.surveyTemplates[i]._id === response.data._id){
                      console.log("here");
                      this.user.surveyTemplates[i] = response.data;
                      break;
                    }
                  }


                  console.log(this.user.surveyTemplates);
              })

              this.newSurvey = {

                title:null,
                author:this.user._id,
                questions:[
                {
                  question:null,
                  header:null,
                  type:null
                }
                ]
              };


              self.openToast("Saved Convo")

              };

              MainController.prototype.removeQuestion = function (index, survey) {
                var _this = this;
                var self = this;
                console.log("here");
                console.log(survey);
                //does both remove for newSurvey and changeSurvey
                if(index > -1){
                  survey.questions.splice(index, 1);
                }

                console.log(survey.questions);
                self.openToast("Removed Question");
              }

            MainController.prototype.cancelChangeSurvey = function(){
              var _this = this;
              var self = this;
              //need to refresh the page
              this.changeSurvey = "new";
              self.openToast("Editing Cancel");
            }

            MainController.prototype.getSurveys = function(){
              var _this = this;
              var self = this;
              console.log("surveys");
              console.log(_this.surveyTemplates);
              _this.surveyTemplates = [];
              _this.$http.get('/api/surveyTemplate/selectedUser/'+ this.user._id).then(function successCallback(response) {
                console.log(response);
                _this.surveyTemplates = response.data;
                console.log(_this.surveyTemplates);
              })
            }

              MainController.prototype.saveSurvey = function($event){
                var _this = this;
                var self = this;
                console.log("hey");
                console.log(this.newSurvey);

                _this.$http.post('/api/surveyTemplate/create', this.newSurvey).then(function successCallback(response) {
                  console.log(response);
                  _this.surveyTemplates.push(response.data);

                });

                this.newSurvey = {

                  title:null,
                  author:this.user._id,
                  questions:[
                    {
                      question:null,
                      header:null,
                      type:null
                    }
                  ]
                };
                self.openToast("Survey Created");


              };

              MainController.prototype.cancelSurvey = function($event){
                var _this = this;
                var self = this;
                console.log("Cancel!");
                console.log(this.questions);
                this.questions = null;
                this.surveyTitle = null;
                this.counter = 0;
                this.questionAmount = null;
                this.questionAmount = [
                  0
                ];

                self.openToast("Cancel Survey");


              };

              MainController.prototype.toggle = function (item, list) {
                  var idx = list.indexOf(item);
                  if (idx > -1)
                      list.splice(idx, 1);
                  else
                      list.push(item);
              };
              ;
              MainController.prototype.exists = function (item, list) {
                  return list.indexOf(item) > -1;
              };
              ;
              MainController.prototype.toggleAll = function () {
                  if (this.selectSurveyUser.length === this.user.clients.length) {
                    this.selectSurveyUser = [];
                  }
                  else if (this.selectSurveyUser.length === 0 || this.selectSurveyUser.length > 0) {
                    this.selectSurveyUser = this.user.clients.slice(0);
                  }
              };
              ;

              MainController.prototype.isChecked = function () {
                  return this.selectSurveyUser.length === this.user.clients.length;
              };
              ;
              MainController.prototype.isIndeterminate = function () {
                  return (this.selectSurveyUser.length  !== 0 &&
                      this.selectSurveyUser.length  !== this.user.clients.length);
              };
              ;
            this.image_source="";
            MainController.prototype.setFile = function(element) {
                var _this=this;
                _this.currentFile = element.files[0];
                var reader = new FileReader();

                reader.onload = function(event) {
                    _this.image_source = event.target.result;
                    _this.$apply();

                };
                // when the file is read it triggers the onload event above.
                reader.readAsDataURL(element.files[0]);
            };



              MainController.prototype.getSurveyResponses = function () {
                console.log("get survey");

                var _this = this;
                  _this.convoSurveyResponse=[];
                  _this.tabIndex=2;
                var self = this;
                console.log("Here");

                _this.$http.get('/api/assignment/survey/user/' + this.selected._id).then( function (response) {
                  console.log(response);
                  response.data.forEach(function (assignment) {
                    _this.$http.get('/api/response/selectedAssignment/' + assignment._id).then(function (response1) {
                      console.log(response1);
                      if(response1.data.length > 0){
                        var time = new Date(assignment.specificDate);

                        var info = {
                          ass: assignment,
                          date:time,
                          res: response1.data[0]
                        }
                        _this.convoSurveyResponse.push(info)
                      }
                      else{
                        var time = new Date(assignment.specificDate);
                        var info = {
                          ass: assignment,
                          date: time,
                          res: []
                        }
                        _this.convoSurveyResponse.push(info)
                      }
                      console.log(_this.convoSurveyResponse);

                    })
                  })

                });


              }


              MainController.prototype.sendOutSurvey = function ($event) {
                console.log("here");
                var _this = this;
                var self = this;
                console.log("Here");
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/surveys/selectorModal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.SurveySelectorController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                      selected: null
                    }
                }).then(function (surveyInfo) {

                  console.log(surveyInfo);



                        var surveyAndUsers = {
                         surveyInfo: surveyInfo,
                            selectedSurvey:  _this.selectedSurvey,
                         users:  _this.selectSurveyUser


                       };

                       _this.$http.post('/api/assignment/createFromSurvey' , surveyAndUsers).then(function (response){
                           console.log("this sungun worked" + JSON.stringify(response.data));
                      });
                    })












                  // for (var i = 0; i < _this.selectSurveyUser.length; i++) {
                  //   _this.selectedSurvey.selectedUsers.push(_this.selectSurveyUser[i]._id);
                  // }
                  // console.log();
                  // console.log(_this.selectedSurvey.selectedUsers);
                  // console.log();
                  // var updatedSurvey = {
                  //
                  //   repeat: self.selectedSurvey.repeat,
                  //   days: self.selectedSurvey.days,
                  //   hour: self.selectedSurvey.timeOfDay.getHours(),
                  //   minute: self.selectedSurvey.timeOfDay.getMinutes()
                  // };
                  //
                  // // For all of the users that were assigned a survey
                  //
                  // //this is making me nervous
                  // for (var i = 0; i < _this.selectedSurvey.selectedUsers.length; i++) {
                  //
                  //   var surveyUserAssign = {
                  //     repeat: updatedSurvey.repeat,
                  //     days: updatedSurvey.days,
                  //     hour: updatedSurvey.hour,
                  //     minute: updatedSurvey.minute,
                  //     userId: _this.selectedSurvey.selectedUsers[i],
                  //     surveyTemplateId: _this.selectedSurvey._id,
                  //     type: "survey"
                  //   }
                  //   // POST the selectedSurvey to the user
                  //
                  //   console.log("survey if " + surveyUserAssign.surveyTemplateId);
                  //   console.log("user id" + surveyUserAssign.userId);
                  //
                  //   //first make a object that can be turned into a object on the back end
                  //
                  //   self.$http.post('/api/assignment/create' , surveyUserAssign).then(function (response){
                  //     console.log("this sungun worked" + JSON.stringify(response.data));
                  //   });
                  //}});








              };

              MainController.prototype.previewSurvey = function ($event) {
                console.log("here");
                var _this = this;
                var self = this;
                console.log("Here");
                console.log(this.selectedSurvey);
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                /*this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/surveys/previewModal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.MainController,
                    controllerAs: "vm",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                      selected: null
                    }
                });*/
                this.$http.post('/api/surveyTemplate/preview', this.selectedSurvey).then(function (response) {
                  console.log('Previewing survey');
                  console.log(response.data);
                });
                console.log("here2");

              };







            MainController.prototype.addMedium = function ($event) {
              var _this = this;
              var self = this;

              var medium = {
                text: this.selected.defaultCommsMedium

              };

              _this.$http.post('/api/user/updateMedium/' + this.selected.id, medium).then(function successCallback(response) {
              console.log(response.data);
              console.log(this.selected);

            })
              self.openToast("Medium Updated");
            };
            MainController.prototype.addSlackId = function ($event) {
              var _this = this;
              var self = this;

              var slack = {
                text: this.selected.slack_id

              };

              _this.$http.post('/api/user/updateSlackId/' + this.selected.id, slack).then(function successCallback(response) {
              console.log(response.data);
              console.log(this.selected);

            })
              self.openToast("SlackId Updated");
            };



            MainController.prototype.addBio = function ($event) {

              var _this = this;
              var self = this;
              var bio = {
                body: this.selected.bio,
                author: this.user.id,
                assignee: this.selected.id
              }


              console.log(this.user);
              console.log(bio);
              _this.$http.post('/api/bio/create/' + bio.assignee, bio).then(function successCallback(response) {
              console.log(response.data);
              console.log(this.selected);


              });

              self.openToast("Bio Updated");

            };


            MainController.prototype.addPhoneNumber = function ($event) {
              var _this = this;
              var self = this;
              var phoneNumber = {
                number: this.selected.phoneNumber
              };
              _this.$http.post('/api/phonenumber/create/' + this.selected.id, phoneNumber).then(function (response) {

              });

              self.openToast('Phone Number Updated');
            };
            MainController.prototype.addPipelineStage = function ($event) {


              console.log(this.selected.pipelineStage);
              var _this = this;
              var self = this;
              var pipelineStage = {
                body: this.selected.pipelineStage,
                author: this.user.id,
                assignee: this.selected.id
              }


              console.log(this.user);
              console.log(pipelineStage);
              _this.$http.post('/api/pipelineStage/create/' + pipelineStage.assignee, pipelineStage).then(function successCallback(response) {
              console.log(response.data);
              console.log(this.selected);


              });

              self.openToast("Pipeline Stage Updated");

            };
            MainController.prototype.removeUser = function ($event) {
                var _this = this;
                console.log("this worked");
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to delete this user?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                    if(result) {
                        userToBeDeleted = _this.selected;
                        _this.$http.post('/api/user/delete/'+ userToBeDeleted._id).then(function successCallback(response) {


                            if (response) {
                                console.log("done");
                                self.openToast('User deleted. ');
                                self.selected = self.clients[0];
                                self.clients.splice(self.clients.indexOf(userToBeDeleted),1);

                            } else {
                                self.openToast('User not deleted. ');
                            }

                        });

                    }
                });
            };
            MainController.prototype.unsub = function ($event) {
                var _this = this;
                console.log("this worked");
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to unsubscribe ?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                    if(result) {
                        userToBeDeleted = _this.selected;
                        _this.$http.get('/api/user/unsub/'+ self.user._id).then(function successCallback(response) {


                            if (response) {
                                console.log("done");
                                self.openToast('User unsubscribed. ');


                            } else {
                                self.openToast('User not unsubscibed. ');
                            }

                        });

                    }
                });
            };
            MainController.prototype.sub = function (plan,$event) {
                var _this = this;
                console.log("this worked");
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to subscribe ?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                    if(result) {
                        if (!self.user.wellBecharged) {
                            userToSUb = _this.selected;
                            var p = {plan: plan, userId: self.user._id};
                            _this.$http.post('/api/user/sub', p).then(function successCallback(response) {


                                if (response) {
                                    console.log("done");
                                    self.openToast('User subscribed. ');


                                } else {
                                    self.openToast('User not subscibed. ');
                                }

                            });

                        }else{
                            _this.$http.get('/api/user/unsub/'+ self.user._id).then(function successCallback(response) {});
                            var p = {plan: plan, userId: self.user._id};
                            _this.$http.post('/api/user/sub', p).then(function successCallback(response) {


                                if (response) {
                                    console.log("done");
                                    self.openToast('User subscribed. ');


                                } else {
                                    self.openToast('User not subscibed. ');
                                }

                            });
                            }
                    }
                });

            };

            MainController.prototype.resub = function ($event) {
                var _this = this;
                console.log("this worked");
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to subscribe ?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                    if(result) {
                        if (!self.user.wellBecharged) {
                            var plan= _this.user.plan;
                            var p = {plan: plan, userId: self.user._id};
                            _this.$http.post('/api/user/resub', p).then(function successCallback(response) {


                                if (response) {
                                    console.log("done");
                                    self.openToast('User subscribed. ');


                                } else {
                                    self.openToast('User not subscibed. ');
                                }

                            });

                        }else{
                            _this.$http.get('/api/user/unsub/'+ self.user._id).then(function successCallback(response) {});
                            var p = {plan: plan, userId: self.user._id};
                            _this.$http.post('/api/user/sub', p).then(function successCallback(response) {


                                if (response) {
                                    console.log("done");
                                    self.openToast('User subscribed. ');


                                } else {
                                    self.openToast('User not subscibed. ');
                                }

                            });
                        }
                    }
                });

            };


            MainController.prototype.changePlan = function ($event) {
                var _this = this;
                var self = this;
                console.log(self.user);
                var useFullScreen = ( this.$mdMedia('md'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/user/changePlanDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.MainController,
                    controllerAs: "vm",
                    clickOutsideToClose: true,
                    windowClass: 'large-Modal',

                    locals: {
                        selected: self.user
                    }
                }).then(function (plan) {

                });
            }


            MainController.prototype.editImage = function ($event) {
                var _this = this;
                var self = this;
                console.log(userSelected);

                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/user/editImage.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.AddUserDialogController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: userSelected
                    }
                }).then(function (user) {
                    // Call user service
                    //console.log('this is user' + JSON.stringify(user));

                    _this.$http.post('/api/user/get',  user).then(function successCallback(err,client) {
                        console.log(client);
                        if (!err) {
                            for(var i = 0; i < self.user.clients.length; i++) {
                                var obj = self.user.clients[i];
                                if(obj._id == client.id ){
                                    var index =  self.user.clients.indexOf(obj);
                                    self.user.clients.splice(index, 1);
                                }

                            }


                            self.user.clients.push(client);
                            self.openToast('image edited ');

                        }
                        else {
                            console.log(err);
                            for(var i = 0; i < self.user.clients.length; i++) {
                                var obj = self.user.clients[i];
                                if(obj._id == err.data.id ){
                                    var index =  self.user.clients.indexOf(obj);
                                    self.user.clients.splice(index, 1);
                                }

                            }

                            err.data.imgUrl = err.data.imgUrl + '?decache=' + Math.random();

                            self.user.clients.push(err.data);
                            self.openToast('image edited ');


                        }
                    })



                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };
            MainController.prototype.editCoachImage = function ($event) {
                var _this = this;
                var self = this;
                console.log(userSelected);

                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/user/editImage.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.AddUserDialogController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: user
                    }
                }).then(function (user) {
                    // Call user service
                    //console.log('this is user' + JSON.stringify(user));

                    _this.$http.post('/api/user/get',  user).then(function successCallback(err,client) {
                        console.log(client);
                        if (!err) {


                            client.imgUrl = client.imgUrl+ '?decache=' + Math.random();
                            self.user.imgUrl = client.imgUrl ;
                            self.openToast('image edited ');

                        }
                        else {


                            err.data.imgUrl = err.data.imgUrl + '?decache=' + Math.random();

                            self.user.imgUrl = err.data.imgUrl;
                            self.openToast('image edited ');


                        }
                    })



                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };


            MainController.prototype.editUser = function ($event) {
                var _this = this;
                var self = this;
                console.log(userSelected);

                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/user/editUserDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.AddUserDialogController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: userSelected
                    }
                }).then(function (user) {
                    // Call user service
                    //console.log('this is user' + JSON.stringify(user));


                    if(user.newUser) {
                        _this.$http.post('/api/user/create', user).then(function successCallback(response) {
                            //console.log('The user\'s id is: ' + response.data.id);
                            //  console.log('The user\'s _id is: ' + response.data._id);
                            //this.user.clients.push(response.data.id);

                            if (response.data.id) {
                                console.log("done");
                                _this.$http.post('/api/coach/newuser/' + this.user.id + '?' + response.data.id, user).then(function successCallback(client) {
                                    console.log("done2");
                                    self.user.clients.push(response.data);
                                    console.log("User created:")
                                    console.log(response.data);
                                    self.openToast("User added And Email Sent!");
                                    _this.$http.post('api/facebook/email/', user).then(function successCallback(response) {
                                        console.log("email done!");
                                        //console.log(response);
                                    });
                                });
                            } else {
                                self.openToast('User not added. ' + response.data.errors.password.message);
                            }

                        });
                    }
                    else{
                        //TODO: editUser
                        _this.$http.post('/profile/update', user).then(function successCallback(response) {
                            //console.log('The user\'s id is: ' + response.data.id);
                            //  console.log('The user\'s _id is: ' + response.data._id);
                            //this.user.clients.push(response.data.id);

                            console.log(response.data);
                            if (response.data._id) {
                                console.log("done");
                                _this.$http.post('/api/coach/newuser/' + this.user._id + '?' + response.data._id, user).then(function successCallback(client) {
                                    console.log("done2");
                                    for(var i = 0; i < self.user.clients.length; i++) {
                                        var obj = self.user.clients[i];
                                        if(obj._id == response.data._id ){
                                            var index =  self.user.clients.indexOf(obj);
                                            self.user.clients.splice(index, 1);
                                        }

                                    }


                                    self.user.clients.push(response.data);
                                    self.selectUser(response.data);
                                    console.log("User created:")
                                    console.log(response.data);
                                    self.openToast("User edited");

                                });
                            } else {
                                self.openToast('User not added. ' + response.data.errors.password.message);
                            }

                        });

                    }
                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };

            MainController.prototype.addUser = function ($event) {
                var _this = this;
                var self = this;

                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/user/a.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.AddUserDialogController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    locals: {
                        selected : null
                    },
                    fullscreen: useFullScreen
                }).then(function (user) {
                    // Call user service
                    //console.log('this is user' + JSON.stringify(user));



                   /* _this.$http.post('/api/user/create', user).then(function successCallback(response) {
                      //console.log('The user\'s id is: ' + response.data.id);
                    //  console.log('The user\'s _id is: ' + response.data._id);
                      //this.user.clients.push(response.data.id);

                      if (response.data.id) {
                        console.log("done");
                        _this.$http.post('/api/coach/newuser/' + this.user.id + '?' + response.data.id,  user).then(function successCallback(client){
                          console.log("done2");
                          self.user.clients.push(response.data);
                          console.log("User created:")
                          console.log(response.data);
                          self.openToast("User added And Email Sent!");
                          _this.$http.post('api/facebook/email/', user).then(function successCallback(response) {
                            console.log("email done!");
                            //console.log(response);
                          });
                        });
                      } else {
                        self.openToast('User not added. ' + response.data.errors.password.message);
                      }

                    });*/

                    _this.$http.post('/api/user/setPhoto',  user).then(function successCallback(err,client){
                        //console.log(client);
                        console.log(err);
                        _this.$http.post('/api/user/get',  user).then(function successCallback(err,client) {
                            console.log(client);
                            if (!err) {
                                self.user.clients.push(client);
                                self.openToast('User added. ');

                            }
                            else {
                                console.log(err);
                                self.user.clients.push(err.data);

                                self.openToast('User added. ');


                            }
                        })


                    });




                        /*_this.$http.post('/api/user/get',  user).then(function successCallback(err,client){
                        console.log(client);
                        if(!err){
                            self.user.clients.push(client);
                            self.openToast('User added. ');

                        }
                        else{
                            console.log(err);
                            self.user.clients.push(err.data);

                            self.openToast('User added. ');


                        }
                    });*/


                    }, function () {
                    console.log('You cancelled the dialog.');
                });
            };

            MainController.prototype.addOrUploadUser = function ($event) {
              var _this = this;
              var self = this;

              var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
              this.$mdDialog.show({
                templateUrl: './dist/view/dashboard/user/newOrUploadUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: dashboard.AddOrUploadUserDialogController,
                controllerAs: "ctrl",
                clickOutsideToClose: true,
                fullscreen: useFullScreen
              }).then(function (option) {
                if (option.add) {
                  console.log('You wish to add a new user.');
                  _this.addUser($event);
                } else if (option.upload) {
                  console.log('You wish to upload a list of existing users.');
                  _this.uploadUsers($event);
                } else {
                  console.log('You wish to add a user through facebook.');
                  _this.addUserThroughFacebook($event);
                }
              }, function () {
                console.log('You cancelled the dialog.');
              });
            };






            MainController.prototype.addUserThroughFacebook = function ($event) {
              var _this = this;
              var self = this;
              console.log('Begin addUserThroughFacebook');
              console.log(_this.user);
              FB.ui({
                method: 'apprequests',
                message: 'Welcome to FitPath!'
              }, function (_response) {
                console.log(_response);

                // Loop through all ids in _response.to
                // This code is vomit-inducing. Blame Facebook.
                for (var i = 0; i < _response.to.length; i++) {
                  _this.$http.get('/api/facebook/getprofile/' + _response.to[i] + '/' + _this.user.providerData.accessToken).then(function (response) {
                    console.log(response);
                    var user = response.data;
                    user.coaches = _this.user._id;
                    // TODO: change this
                    user.phoneNumber = '+1then just numbers';
                    _this.$http.post('/api/user/create', user).then(function (__response) {
                        _this.$http.post('/api/coach/newuser/' + this.user.id + '?' + __response.data.id, user).then(function (client) {
                          console.log("Here fb");
                          self.user.clients.push(__response.data);
                        });
                    });
                  });
                }
              });
            };

            MainController.prototype.uploadUsers = function ($event) {
              var _this = this;
              var self = this;
              var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
              this.$mdDialog.show({
                templateUrl: './dist/view/dashboard/user/uploadUsersDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: dashboard.UploadUserDialogController,
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
              }).then(function (userList) {
                // Post to parser
                _this.$http.post('/api/user/parse-csv', {textToParse: userList}).then(function (response) {
                  // Post to backend
                  var avatars = [
                    'ashley.png', 'james.png', 'jenn.png', 'jo.png', 'john.png', 'julie.png', 'mamajess.png', 'sharon.png'
                  ];
                  for (var i = 0; i < response.data.length; i++) {
                    var user = {
                      firstName: response.data[i][0],
                      lastName: response.data[i][1],
                      bio: response.data[i][2],
                      username: response.data[i][3],
                      password: response.data[i][4],
                      slack_id: response.data[i][5],
                      slack: {
                        email: response.data[i][6],
                        id: response.data[i][7],
                        name: response.data[i][8],
                        real_name: response.data[i][9],
                        img: '/assets/img/' + avatars[Math.floor(Math.random() * 7)]
                      },
                      coaches: _this.user._id,
                      imgUrl: '/assets/img' + avatars[Math.floor(Math.random() * 7)],
                      phoneNumber: response.data[i][10]
                    };
                    _this.$http.post('/api/user/create', user).then(function (response) {
                      _this.$http.post('/api/coach/newuser/' + this.user.id + '?' + response.data.id, user).then(function (client) {
                        self.user.clients.push(response.data);
                      });
                    });
                  }
                });
              }, function () {
                console.log('You cancelled the dialog.');
              });
            };



            MainController.prototype.addDays = function(date, days){
              var result = new Date(date);
              result.setDate(result.getDate() + days);
              return result;
            }

            MainController.prototype.getRemindersResponses = function () {
              var _this = this;
                _this.tabIndex=1;
              _this.convoReminderResponse = [];
              console.log("Get Reminder");

              _this.$http.get('/api/reminder/selectedUser/' + this.selected._id).then(function(response){
                console.log(response.data);

                response.data.forEach(function (reminder) {
                  var content = [];
                  var fullcontent = {};


                  _this.$http.get('/api/assignment/selectedReminder/' + reminder._id).then(function(response1){
                    console.log("sadasdasd");
                    console.log(response1);


                    var content = [];
                    response1.data.forEach(function (assignment) {
                      console.log(assignment);

                      _this.$http.get('/api/response/selectedAssignment/' + assignment._id).then(function (response2) {
                        console.log(response2);

                          if(response2.data.length === 0){
                            console.log("nope res");
                            var date = new Date(assignment.specificDate);
                            console.log(date);
                            var rA = {
                              ass: assignment,
                              time: date.toLocaleString('en-CAN')
                            }
                            content.push(rA);
                          }
                          else {
                            console.log("yes");
                            var date = new Date(assignment.specificDate);
                            console.log(date);

                            var rA = {
                              ass: assignment,
                              time: date.toLocaleString('en-CAN'),
                              res: response2.data[0]
                            }
                            content.push(rA);
                          }
                      })
                    })
                      fullcontent = {
                        reminder: reminder,
                        contentArray: content
                      }
                      console.log('fullcontent');
                      console.log(JSON.stringify(fullcontent));

                      _this.convoReminderResponse.push(fullcontent);
                      console.log('convoReminderResponse');
                      console.log(_this.convoReminderResponse);

                  })

                })

              })
            }

            MainController.prototype.addReminder = function ($event) {
                var _this = this;
                var self = this;
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/reminders/modal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.ReminderController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: null
                    }
                }).then(function (object) {
                    console.log(object);
                    // First step, create the reminder and save it on the db
                    var reminder = {
                      _id: object._id,
                      title: object.title,
                      days: object.days,
                      hour: object.hour,
                      minute: object.minute,
                      creationDate: new Date(),
                      selectedDates: object.selectedDates,
                      daysOfTheWeek: object.dates,
                      author: object.author,
                      assignee: object.assignee,
                        repeat: object.repeat
                    }
                    JSON.stringify(reminder);
                    console.log(reminder);

                    var date = new Date();
                    var today = date.getDay();
                    console.log("timeOfDay");
                    console.log(object.timeOfDay);
                    console.log("date");
                    console.log(date);

                    _this.$http.post('/api/reminder/createReminderAndAssignments', reminder).then(function successCallback(response) {
                        console.log("im a reminder" + JSON.stringify(response.data.reminder));
                        _this.getRemindersResponses();
                        console.log( JSON.stringify( _this.convoReminderResponse));
                        self.openToast("Reminder added");
                    });

                                       
                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };


            MainController.prototype.hasReminders = function (user) {
              // Go through all of the reminders
              for (var i = 0; i < this.reminders.length; i++) {
                // If the user's id matches any of the reminder's assignee
                if (this.reminders[i].assignee === user._id) {
                  // The user has a reminder, so return true
                  return true;
                }
              }
              // If the user's id doesn't match any of the reminder's assignee, return false
              return false;
            };

            MainController.prototype.getReminders = function () {
              var _this = this;
              console.log('Getting reminders');
              _this.$http.get('/api/reminder/list').then(function (response) {
                _this.reminders = response.data;
                console.log(response.data);
              });
            };

            MainController.prototype.getResponses = function () {
              var _this = this;
              console.log('Getting responses');
              this.$http.get('/api/response/list').then(function (response) {
                _this.responses = response.data;
                console.log(response.data);
              });
            };
            MainController.prototype.updateAssignment = function ($event,res) {
                var ass = res.ass;
                var _this = this;
                var self = this;
                console.log(this);
                console.log(ass);
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/notes/noteModal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.AssignmentController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected:res
                    }
                }).then(function (note) {
                    console.log(note);
                    if(res.res){
                        _this.$http.get('/api/response/delete/'+res.res._id).then(function successCallback(response) {
                            console.log(response);
                            //self.selected.notes.push(response.data);
                            _this.$http.post('/api/response/update', note).then(function successCallback(response1) {
                                console.log(response1);
                                //self.selected.notes.push(response.data);
                                res.res = response1.data;
                            });
                        });
                    }
                    else {
                        _this.$http.post('/api/response/update', note).then(function successCallback(response1) {
                            console.log(response1);
                            //self.selected.notes.push(response.data);
                            res.res = response1.data;
                        });
                    }

                    self.openToast("response added");

                }, function () {
                    console.log('You cancelled the dialog.');

                });
            };
            MainController.prototype.showMore = function (ev,mes) {
                this.$mdDialog.show(
                    this.$mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Response')
                        .textContent(mes)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
            }

            MainController.prototype.updateSurveyAssignment = function ($event,res) {
                var ass = res.ass;
                var _this = this;
                var self = this;
                console.log("res");
                console.log(res);
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/notes/noteModal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.SurveyAssignmentController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected:res
                    }
                }).then(function (note) {
                    console.log(res.res);
                    if(res.res.questions){
                        _this.$http.get('/api/response/delete/'+res.res._id).then(function successCallback(response) {
                            console.log(response);
                            //self.selected.notes.push(response.data);
                            _this.$http.post('/api/response/update', note).then(function successCallback(response1) {
                                console.log(response1);
                                //self.selected.notes.push(response.data);
                                res.res = response1.data;
                            });
                        });
                    }
                    else {
                        _this.$http.post('/api/response/update', note).then(function successCallback(response1) {
                            console.log(response1);
                            //self.selected.notes.push(response.data);
                            res.res = response1.data;
                        });
                    }

                    self.openToast("response added");

                }, function () {
                    console.log('You cancelled the dialog.');

                });
            };

            MainController.prototype.addNote = function ($event) {

              var _this = this;
              var self = this;
              console.log(this);
              var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
              this.$mdDialog.show({
                  templateUrl: './dist/view/dashboard/notes/noteModal.html',
                  parent: angular.element(document.body),
                  targetEvent: $event,
                  controller: dashboard.NoteController,
                  controllerAs: "ctrl",
                  clickOutsideToClose: true,
                  fullscreen: useFullScreen,
                  locals: {
                      selected: null
                  }
              }).then(function (note) {
                  console.log(note);


                  _this.$http.post('/api/note/create', note).then(function successCallback(response) {
                      console.log(response);
                      self.selected.notes.push(response.data);
                  });

                  self.openToast("Note added");
              }, function () {
                  console.log('You cancelled the dialog.');

              });
            };

            MainController.prototype.editReminder = function ($event, r) {
                var _this = this;
                var reminder = r.reminder;
                console.log("convoReminderResponse "+ JSON.stringify(r));
                console.log("reminder " + JSON.stringify(reminder));
                console.log('main controller edit reminder');
                console.log(reminder);
                var self = this;
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/reminders/modal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.ReminderController,
                    controllerAs: "ctrl",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: reminder
                    }
                }).then(function (reminder) {
                    console.log(reminder.responses);
                    console.log(userSelected);

                    // Post request, and push onto users local list of reminders
                    // this.$http.post('uri').then((response) => response.data)
                    // after promise is succesful add to
                    // reminder.assigne.reminders.push()
                    _this.$http.post('/api/reminder/update/' + reminder._id, reminder).then(function successCallback(reminder) {
                        console.log('returned junk: ' + JSON.stringify(reminder.data));
                        self.openToast("Reminder Edited");
                        _this.getRemindersResponses();

                        //  self.selected.reminders.push(response.data);
                        if (self.updateReminder(reminder.data)) {
                          // Create the assignment object
                          var reminderUserAssign = {
                            repeat: true,
                            days: reminder.data.days,
                            hour: reminder.data.hour,
                            minute: reminder.data.minute,
                            userId: reminder.data.assignee,
                            reminderId: reminder.data._id,
                            type: 'reminder',
                              repeat: object.repeat
                          };
                          // Call sendOutReminder
                          _this.sendOutReminder(reminderUserAssign);
                            /*if (reminder.data.parent.id) {
                                var id = reminder.data.parent.id.slice(1, 25);
                                self.updateReminderInSurvey(id, reminder.data);
                            }*/
                            self.openToast("Reminder Edited");
                        }
                        else {
                            //self.openToast("Reminder Not Found!");
                        }
                    });
                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };
            MainController.prototype.removeReminder = function ($event, reminder) {
                var _this = this;
                console.log("this worked");
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to remove this reminder?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                    if (result) {
                        console.log('removing reminder id: ' + reminder._id);
                        _this.$http.post('/api/reminder/remove/' + reminder._id, reminder)
                            .then(function successCallback(success) {

                            if (success) {
                                console.log("removing works");

                                self.openToast("Reminder Removed.");
                                _this.getRemindersResponses();

                            }
                            else {
                                console.log("removing AS did not work");
                            }
                        });
                    }
                    else {
                    }

                });
            };

            MainController.prototype.updateSurveyResponses = function (survey) {
              console.log('Inside updateSurveyResponses');
              console.log(userCoach);
              for (var i = 0; i < userCoach.surveyTemplates.length; i++) {
                if (survey._id == userCoach.surveyTemplates[i]._id) {
                  userCoach.surveyTemplates[i] = survey;
                }
              }
              scope.$apply();
              console.log(survey);
            };
//this method can live

            MainController.prototype.updateReminder = function (reminder) {
                console.log('Inside updateReminder');
                console.log(reminder);
                for (var i = 0; i < this.reminders.length; i++) {
                    if (reminder._id == this.reminders[i]._id) {
                        this.reminders[i] = reminder;
                        console.log(this.reminders);
                        console.log('Look ma, an update!');
                        return true;
                    }
                }
                return false;
            };
            MainController.prototype.deleteReminder = function (reminder) {
                this.reminders = _.without(this.reminders, reminder);
                /*var foundIndex = this.selected.reminders.indexOf(reminder);
                this.selected.reminders.splice(foundIndex, 1);*/
            };
            MainController.prototype.slackList = function () {
                // var test = this.userService.slack().then((members: any) => {
                //   console.log('here');
                //   console.log(members);
                // });
            };
            MainController.prototype.testButton = function (email, slack) {
                console.log('test-button');
                var test = this.userService.create(email, slack)
                    .then(function (result) {
                    console.log(result);
                }, function (err) {
                    console.log(err);
                });
            };
            // removeReminder(reminder) {
            //   var foundIndex = this.selected.reminders.indexOf(reminder);
            //   this.selected.reminders.splice(foundIndex, 1);
            //   this.openToast("Reminder removed");
            // }
            MainController.prototype.clearReminders = function ($event) {
                var confirm = this.$mdDialog.confirm()
                    .title('Are you sure you want to delete all reminders?')
                    .textContent('All reminders will be deleted, you can\'t undo this action.')
                    .ariaLabel('Delete all reminders')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function () {
                    self.selected.reminders = [];
                    self.openToast("Cleared reminders");
                });
            };







            MainController.prototype.removeNote = function ($event, note) {

              var _this = this;
              var confirm = this.$mdDialog.confirm()
                  .textContent('Are you sure you want to remove this note?')
                  .ariaLabel('Remove')
                  .targetEvent($event)
                  .ok('Yes')
                  .cancel('No');
              var self = this;
              this.$mdDialog.show(confirm).then(function (result) {
              console.log(note);
              console.log(result);
              if (result) {
                _this.$http.post('/api/note/remove/' + note._id, note)
                  .then(function successCallback(success) {
                    if (success) {
                      console.log(success);
                      self.deleteNote(note);
                    }
                    else {
                    }
                  });
              }
              else {
              }
              self.openToast("Note Removed.");

              });

            };

            MainController.prototype.deleteNote = function (note) {
              this.selected.notes = _.without(this.selected.notes, note);

            };

            MainController.prototype.sendMessage = function (message) {
              var _this = this;
              console.log('Begin submit');
              console.log('this.selected: ' + JSON.stringify(this.selected));
              this.$http.post('/api/message/sendsms/', {'body': message, 'sentBy': this.selected.coaches[0], 'sentTo': ""+this.selected._id}).then(function (response) {
                console.log('response.data is ' + JSON.stringify(response.data));
                //console.log('_this.selected.messages is: ' + JSON.stringify(_this.selected.messages));
                console.log(_this.selected.messages); // Why is this undefined?
                _this.selected.messages.push(response.data);
                console.log('self.selected is:' + JSON.stringify(_this.selected.messages));
              });
            };

            MainController.prototype.sendFB = function (message) {
              /*var _this = this;
              console.log('Begin submit');
              console.log('this.selected: ' + JSON.stringify(this.selected));
              this.$http.post('/api/message/sendfb/', {'body': message, 'sentBy': this.selected.coaches[0], 'sentTo': this.selected.id}).then(function (response) {
                console.log('response.data is ' + JSON.stringify(response.data));
                console.log(_this.selected.messages);
                _this.selected.messages.push(response.data);
                console.log('self.selected is: ' + JSON.stringify(_this.selected.messages));
              });*/
            };

            // socket.io code ahead
            // socket.on('message', function (data) {
            //   MainController.prototype.receiveMessage(data);
            // });

            MainController.prototype.receiveMessage = function (message) {
              console.log('userSelected is: ' + JSON.stringify(userSelected));
              console.log('Message received from server');
              console.log(message);
              //if (this.selected) {
                if (userSelected._id === message.sentBy) {
                  console.log('Message pushed.');
                  userSelected.messages.push(message);
                  scope.$apply();
                }
              //}
            };

            MainController.prototype.editNote = function($event, note){
              console.log("TETETT");
              var _this = this;
              var self = this;
              console.log(note);
              var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
              this.$mdDialog.show({
                  templateUrl: './dist/view/dashboard/notes/noteModal.html',
                  parent: angular.element(document.body),
                  targetEvent: $event,
                  controller: dashboard.NoteController,
                  controllerAs: "ctrl",
                  clickOutsideToClose: true,
                  fullscreen: useFullScreen,
                  locals:{
                      selected: note
                  }
                }).then(function (note) {
                  console.log('updating note: ' + note.body);

                  _this.$http.post('/api/note/update/' + note._id, note).then(function successCallback(note) {
                      console.log('returned junk: ' + JSON.stringify(note.data._id));
                      //  self.selected.reminders.push(response.data);
                      if (self.updateNote(note.data)) {
                          /*if (reminder.data.parent.id) {
                              var id = reminder.data.parent.id.slice(1, 25);
                              self.updateReminderInSurvey(id, reminder.data);
                          }*/
                          self.openToast("Note Edited");
                      }
                      else {
                          self.openToast("Note Not Found!");
                      }
                  });
                },function () {
                    console.log('You cancelled the dialog.');
                });
            };
            MainController.prototype.updateNote = function(note){
              console.log('Inside note');
              console.log(userSelected.notes);
              console.log(note);
              for (var i = 0; i < userSelected.notes.length; i++) {
                  if (note._id == userSelected.notes[i]._id) {
                      userSelected.notes[i] = note;
                      console.log(userSelected.notes);
                      console.log('Look ma, an update!');

                      return true;
                  }
              }
              return false;



            };




            MainController.prototype.clearNotes = function ($event) {
                var confirm = this.$mdDialog.confirm()
                    .title('Are you sure you want to delete all notes?')
                    .textContent('All notes will be deleted, you can\'t undo this action.')
                    .ariaLabel('Delete all notes')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                var self = this;
                this.$mdDialog.show(confirm).then(function () {
                    self.selected.notes = [];
                    self.openToast("Cleared notes");
                });
            };

            /*
            MainController.prototype.addSurvey = function ($event) {
                var _this = this;
                var self = this;
                console.log('addSurvey()');
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/survey/modal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.SurveyController,
                    controllerAs: "vm",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: null
                    }
                }).then(function (survey) {
                    // Post request, and push onto users local list of reminders
                    // this.$http.post('uri').then((response) => response.data)
                    // after promise is succesful add to
                    // reminder.assigne.reminders.push()
HI Shane!                    console.log(survey);
                    _this.$http.post('/api/survey', survey).then(function successCallback(survey) {
                        self.selected.surveys.push(survey.data);
                        console.log(survey.data);
                        for (var i = 0; i < survey.data.goals.length; i++) {
                            self.selected.reminders.push(survey.data.goals[i].reminder);
                        }
                    });
                    self.openToast("Survey added");
                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };
            */

            MainController.prototype.editSurvey = function ($event, survey) {
                var _this = this;
                var self = this;
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
                this.$mdDialog.show({
                    templateUrl: './dist/view/dashboard/surveys/modal.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: dashboard.SurveyController,
                    controllerAs: "vm",
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        selected: survey
                    },
                }).then(function (survey) {
                    _this.$http.post('/api/survey/' + survey._id, survey).then(function successCallback(survey) {
                        //  self.selected.reminders.push(response.data);
                        console.log('survey edited');
                        console.log(survey);
                        if (self.updateSurvey(survey.data)) {
                            self.openToast("Survey Edited");
                        }
                        else {
                            self.openToast("Survey Not Found!");
                        }
                    });
                    console.log(survey);
                }, function () {
                    console.log('You cancelled the dialog.');
                });
            };
            MainController.prototype.removeSurvey = function ($event, survey) {
                var _this = this;
                var self = this;
                var confirm = this.$mdDialog.confirm()
                    .textContent('Are you sure you want to remove this survey assignment?')
                    .ariaLabel('Remove')
                    .targetEvent($event)
                    .ok('Yes')
                    .cancel('No');
                this.$mdDialog.show(confirm).then(function (result) {
                    console.log(survey.ass);
                    if (result) {
                        console.log(result);
                        _this.$http.post('/api/assignment/delete/', survey.ass)
                            .then(function successCallback(success) {
                            if (success) {
                                console.log('success');
                                console.log(success);
                                console.log('survey.ass');
                                console.log(survey.ass);
                                self.deleteSurveyAss(survey.ass);
                            }
                            else {
                            }
                        });
                    }
                    else {
                    }
                    self.openToast("Survey Assignment Removed.");
                });
            };
            MainController.prototype.updateSurvey = function (survey) {
                // Update Survey's Reminders
                for (var i = 0; i < survey.goals.length; i++) {
                    this.updateReminder(survey.goals[i].reminder);
                }
                // Find Matching Id's, Replace whole object
                for (var i = 0; i < this.selected.surveys.length; i++) {
                    if (survey._id == this.selected.surveys[i]._id) {
                        this.selected.surveys[i] = survey;
                        return true;
                    }
                }
                return false;
            };
            MainController.prototype.updateReminderInSurvey = function (surveyId, reminder) {
                for (var i = 0; i < this.selected.surveys.length; i++) {
                    if (surveyId == this.selected.surveys[i]._id) {
                        // Update Reminder
                        for (var k = 0; k < this.selected.surveys[i].goals.length; k++) {
                            if (this.selected.surveys[i].goals[k].reminder._id == reminder._id) {
                                this.selected.surveys[i].goals[k].reminder = reminder;
                            }
                        }
                    }
                }
            };
            MainController.prototype.deleteSurvey = function (survey) {
                var index;
                console.log(survey);
                for (var i = 0; i < survey.goals.length; i++) {
                    index = this.selected.reminders.indexOf(survey.goals[i].reminder);
                    this.selected.reminders.splice(index, 1);
                }
                index = this.selected.surveys.indexOf(survey);
                console.log(index);
                this.selected.surveys.splice(index, 1);
            };
            MainController.prototype.deleteSurveyAss = function (ass) {
                _this = this;
                var index;
                console.log(ass);
                for (var i = 0; i < _this.convoSurveyResponse.length; i++) {
                    if(_this.convoSurveyResponse[i].ass._id == ass._id){
                        _this.convoSurveyResponse.splice(i,1);
                    }
                }

            };
            MainController.prototype.openToast = function (message) {
                this.$mdToast.show(this.$mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(5000));
            };



            MainController.prototype.tester = function () {
              console.log("hey im here");
              this.$mdSidenav('left').toggle();
            };




            MainController.prototype.toggleList = function () {
                console.log("hey im here");
                this.$mdSidenav('left').toggle();
            };




            MainController.prototype.selectUser = function (user) {
                var _this = this;
                var self = this;

                this.selected = user;
                this.userService.selectedUser = this.selected;
                userSelected = user;
                var remem = _this.tabIndex;
                _this.getRemindersResponses();
                _this.getSurveyResponses();
                _this.tabIndex=remem;



                // _this.$http.get('/api/userSelected/responses' + user._id)
                // .then(function successCallback(response) {
                //   if (response.data.length !== 0) {
                //
                //   }
                //   else {
                //
                //   }
                //
                // }

                var sidebar = this.$mdSidenav('left');
                if (sidebar.isOpen()) {
                    sidebar.close();
                }

            };

            MainController.prototype.isCoach = function (user) {

                if(user) {
                  if(user.role){
                    if (user && user.role && user.role == "coach") {
                        return true;
                    }
                }


                return false;
              }
            };

            MainController.prototype.popUp = function(){
              console.log("IT WORKED!")
            }

            MainController.prototype.showContactOptions = function ($event) {
                this.$mdBottomSheet.show({
                    parent: angular.element(document.getElementById('wrapper')),
                    templateUrl: './dist/view/dashboard/contactSheet.html',
                    controller: dashboard.DashboardController,
                    controllerAs: "cp",
                    bindToController: true,
                    targetEvent: $event
                }).then(function (clickedItem) {
                    clickedItem && console.log(clickedItem.name + ' clicked!');
                });
            };
            MainController.$inject = ['$scope', 'userService', '$mdSidenav', '$mdBottomSheet',
                '$mdToast', '$mdDialog', '$mdMedia', '$http'];
            return MainController;
        }());
        dashboard.MainController = MainController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=mainController.js.map
