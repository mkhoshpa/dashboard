


function ReminderController($mdDialog, userService, selected) {
    this.$mdDialog = $mdDialog;
    this.userService = userService;
    this.selected = selected;
    this.response = "";
    this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    this.selectedDays = [];
    this.repeat = false;
    this.author = this.userService.get();
    if (this.author.role == "coach") {
        this.author = this.author.id;
        this.assignee = this.userService.selectedUser;
        this.assignee = this.assignee._id;
    }
    else if (this.author.role == "user") {
        this.author = this.author.id;
        this.assignee = this.author;
    }
    if (selected) {
        this.assignee = selected.assignee;

        this._id = selected._id,
            this.selectedDays = selected.selectedDates,
            this.reminder = selected.title,
            this.responses = selected.responses,
            this.time = new Date();
        this.time.setMinutes(selected.minute);
        this.time.setHours(selected.hour);
        this.time.setMilliseconds(0);
        this.time.setSeconds(0);
        this.repeat = selected.repeat;
        this.assignee= selected.assignee;

    }

    this.toggle = function (item, list) {
        var idx = this.days.indexOf(item);
        idx = idx + "";
        var index = list.indexOf(idx);
        if (index === -1) {
            this.selectedDays.push(idx);

        }
        else {
            this.selectedDays.splice(index, 1);
        }
    }


    this.exists = function (item, list) {

        var index = this.days.indexOf(item);
        var answer = false;
        for (var i = 0; i < list.length; i++) {
            if (index == list[i]) {
                answer = true;
            }
        }
        return answer;
    };
    ;
    this.toggleAll = function () {
        if (this.selectedDays.length == 7) {

            this.selectedDays = [];
        }
        else {
            this.selectedDays = [0, 1, 2, 3, 4, 5, 6];
        }
    };
    ;
    this.isChecked = function () {
        return this.selectedDays.length === this.days.length;
    };
    ;
    this.isIndeterminate = function () {
        return (this.selectedDays.length !== 0 &&
        this.selectedDays.length !== this.days.length);
    };
    ;
    this.select = function () {
    };
    this.close = function () {
        this.$mdDialog.cancel();
    };


    this.save = function () {
        //console.log("r" + this.selected);
        //console.log("hello select: " +this.selected.responses);
        //console.log(this.time);
        var dates = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        };

        var days = [];
        var hour = this.time.getHours();
        var minute = this.time.getMinutes();
        var day = this.time.getDay();
        console.log(this.time);
        console.log(day);

        var dateToday = new Date();
        dateToday.setHours(hour);
        dateToday.setMinutes(minute);
        dateToday.setSeconds('00');
        //dateToday.set
        console.log("today date")

        console.log(dateToday);


        if (this.selectedDays.indexOf('Sun') != -1) {
            dates.sunday = true;
            days.splice(this.days.length, 0, 0);
        }
        if (this.selectedDays.indexOf('Mon') != -1) {
            dates.monday = true;
            days.splice(this.days.length, 0, 1);
        }
        if (this.selectedDays.indexOf('Tues') != -1) {
            dates.tuesday = true;
            days.splice(this.days.length, 0, 2);
        }
        if (this.selectedDays.indexOf('Wed') != -1) {
            dates.wednesday = true;
            days.splice(this.days.length, 0, 3);
        }
        if (this.selectedDays.indexOf('Thurs') != -1) {
            dates.thursday = true;
            days.splice(this.days.length, 0, 4);
        }
        if (this.selectedDays.indexOf('Fri') != -1) {
            dates.friday = true;
            days.splice(this.days.length, 0, 5);
        }
        if (this.selectedDays.indexOf('Sat') != -1) {
            dates.saturday = true;
            days.splice(this.days.length, 0, 6);
        }
        var object = {
            _id: this._id,
            title: this.reminder,
            days: days,
            repeat: this.repeat,
            // Will this be set to server time or user's local time?
            //toLocaleTimeString(),
            timeOfDay: dateToday,
            hour: hour,
            minute: minute,
            // array of numbers from 0 to 6 that shows days that we should creat  assignments
            selectedDates: this.selectedDays,
            daysOfTheWeek: dates,
            author: this.author,
            assignee: this.assignee,
            responses: this.responses

        };
        console.log(this.time);
        console.log('check time');
        console.log(object.timeOfDay);
        console.log('check assingee');
        console.log(object);

        //console.log(reminder);
        this.$mdDialog.hide(object);
    }
}





var dashboard;
(function(dashboard) {
  'use strict';

  angular
    .module('dashboard')
    .controller('ClientOverviewController', ClientOverviewController);

    ClientOverviewController.$inject = ['user', '$scope', '$mdToast', '$http', '$mdMedia', '$mdEditDialog','$mdDialog'];

    function ClientOverviewController(user, $scope, $mdToast, $http, $mdEditDialog,$mdMedia, $mdDialog) {
        var vm = this;
        vm.bookmark;
        vm.user = user.current;
        vm.$mdToast = $mdToast;
        vm.$http = $http;
        vm.$mdDialog = $mdDialog;
        vm.$mdMedia = $mdMedia;


        //vm.clients2 = vm.user.clients;

        //vm.clients2[0].username = "Jon Snow";
        //vm.clients2[0].testResponses = ['Ghost', 'Longclaw', 'WinterFell'];
        ///vm.clients2[0].testReminder = ['Yes'];
        //vm.clients2[0].imgUrl = "/../../../assets/imgs/snow.png";


        vm.possibleColumns = [];
        //vm.contents = contents(vm.clients);
        vm.selected = [];
        vm.se=[1];

        vm.testResponses = ['Good', 'nice'];
        vm.selectSurveyUser=[];
        vm.selectSurveyUser= vm.user.clients;


        //Selecting the columns in the md-select
        vm.columns = [

            {
                index: "0",
                name: "Show All Assignments",
                order: "pipelineStage"
            },
            {
                index: "1",
                name: "Jus Show Reminders",
                order: ""
            },
            {
                index: "2",
                name: "Just Show Surveys",
                order: ""
            }
        ];
        vm.selected = 1;
        vm.attrOrder = false;
        //Selected the columns in the md-select
        vm.selectedColumns = [];

        vm.query = {
            filter: '',
            order: 'client',
            limit: 15,
            page: 1
        }
        vm.to = new Date();
        vm.from =  new Date();
        vm.to.setDate(vm.to.getDate()+7);
        vm.from.setDate(vm.from.getDate()-1);

        //Used for the pipeline
        vm.pipelineOptions = [{type: "lead"}, {type: "trial"}, {type: "active-client"}, {type: "previous-client"}, {type: "archived"}, {type: "NA"}];

        //Updating the pipeline
        vm.addPipelineStage = function (client) {
            console.log("add pipeline to backend");
            console.log(client);
            console.log($mdToast);
            if (!client.tempPipelineStage) {
                console.log('No client');
            }
            else {
                var pipelineStage = {
                    body: client.tempPipelineStage,
                    author: vm.user.id,
                    assignee: client.id
                }


                console.log(pipelineStage);

                //Will neeed to change when we update the backend. Need two post one to creat and another adding to the user.
                vm.$http.post('/api/pipelineStage/create/' + pipelineStage.assignee, pipelineStage).then(function successCallback(response) {
                    console.log(response.data);
                    console.log();
                    console.log('HERE');
                    //Does not update on front line on switch back but backend is good
                    client.pipelineStage = response.data.body;
                });
                console.log(vm.user);
                this.openToast("Pipeline Stage Updated");

            }
        };


        vm.surveyViewClients = [];
        vm.surveyTemplates = [];

        vm.coach = 'coach';
        vm.a;
        // get the list of all the surveys and put them in  vm.surveyTemplates
        // put the newest survey in vm.selectedDataSurvey

        vm.getSurveys = function () {
            console.log("surveys");

            vm.surveyTemplates = [];
            vm.$http.get('/api/surveyTemplate/selectedUser/' + vm.user._id).then(function successCallback(response) {

                vm.surveyTemplates = response.data;
                //vm.selectedDataSurvey = vm.surveyTemplates.[0];
                vm.a = response.data.length;
                vm.selectedDataSurvey = vm.surveyTemplates[vm.a - 1];
                vm.updateTable();
                console.log("length of survey list is " + JSON.stringify(vm.a));
            })
        }

        vm.getSurveys();
        //vm.selectedDataSurvey = vm.surveyTemplates.[0];

        vm.updateTable = function () {

            console.log('hey');
            console.log(vm.selectedDataSurvey);

            if (vm.selectedDataSurvey === 'coach') {
                console.log('coach');
            }
            else if (vm.selectedDataSurvey) {
                vm.surveyViewClients = [];

                console.log(vm.selectedDataSurvey._id);
                console.log(vm.selectedDataSurvey);
                console.log(vm.surveyViewClients);

                //This gets the assigments []
                vm.$http.get('/api/assignment/selectedSurvey/' + vm.selectedDataSurvey._id).then(function successCallback(response) {

                    if (response.data.length !== 0) {
                        console.log(response.data);

                        response.data.forEach(function (assignment) {
                            console.log("this should be the assigments");
                            console.log(assignment);
                            console.log("this should be the userId");
                            console.log(assignment.userId);
                            //gets each user one by one
                            vm.$http.get('/api/user/selectedAssignment/' + assignment.userId).then(function successCallback(response2) {
                                console.log(response2);
                                //each user responses
                                vm.$http.get('/api/response/selectedAssignment/' + assignment._id).then(function successCallback(response3) {
                                    console.log(response3);
                                    if (response3.data[0]) {
                                        console.log('good');
                                        var client = {
                                            info: response2.data,
                                            //Change this
                                            responses: response3.data[0]
                                        }
                                    }
                                    else {
                                        console.log('bad');
                                        var client = {
                                            info: response2.data,
                                            responses: []
                                        }
                                    }
                                    vm.surveyViewClients.push(client);
                                    console.log(client)
                                });

                            })

                        });
                    }
                })


            }
        };


        //search engine filter
        vm.removeFilter = function () {
            console.log(vm.query);
            vm.query.filter = '';
        };


        //For the md-select and checkboxes all 5 methods
        vm.toggle = function (item, list) {
            console.log(list);
            var idx = list.indexOf(item);
            if (idx > -1)
                list.splice(idx, 1);
            else
                list.push(item);
        };
        vm.toggle2 = function (item) {
            //console.log(JSON.stringify(vm.user.clients));
            //console.log(JSON.stringify(vm.selectSurveyUser));
            var clients = [];
            vm.user.clients.forEach(function (client) {
                clients.push(client);
            });
            console.log(JSON.stringify(clients));

            var idx = vm.selectSurveyUser.indexOf(item);
            if (idx > -1){
                vm.selectSurveyUser.splice(idx, 1);}
            else{
                vm.selectSurveyUser.push(item);}
            //console.log(JSON.stringify(vm.selectSurveyUser));
            //console.log(JSON.stringify(vm.user.clients));
            console.log(JSON.stringify(clients));

            vm.user.clients = clients;


        };
        vm.showClient = function (client) {
            for(var i=0;i<vm.selectSurveyUser.length;i++){
                if(vm.selectSurveyUser[i]._id == client._id){
                    return true;
                }
            }
            return false;
        }

        vm.exist1 = function (item, list) {
            var answer = false;
            for (var i = 0; i < list.length; i++) {
                if(item == list[i]){
                    answer = true;
                }
            }
            return answer;





        };
        vm.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        vm.toggleAll = function () {
            if (this.selectedColumns.length === vm.columns.length) {
                this.selectedColumns = [];
            }
            else if (this.selectedColumns.length === 0 || this.selectedColumns.length > 0) {
                this.selectedColumns = vm.columns.slice(0);
            }
        };
        vm.toggleAll1 = function () {
            console.log(vm.selectSurveyUser);
            console.log(vm.user.clients);
            if (vm.selectSurveyUser.length >0) {
                vm.selectSurveyUser = [];
            }
            else if (vm.selectSurveyUser.length == 0) {
                vm.selectSurveyUser= vm.user.clients;
            }
        };
        //vm.toggleAll1();

        vm.isChecked = function () {
            return this.selectedColumns.length === vm.columns.length;
        };
        vm.isChecked1 = function () {
            //console.log(vm.selectSurveyUser);
            //console.log(vm.user.clients);

            return vm.selectSurveyUser.length == vm.user.clients.length;
        };

        vm.isIndeterminate = function () {
            return (this.selectedColumns.length !== 0 &&
            this.selectedColumns.length !== vm.columns.length);
        };
        vm.allAssignments = [];
        vm.callServer = function(list){
          var  _this = this;
            _this.allAssignments = [];
            for (var i = 0; i < list.length; i++) {
                _this.getAllAssignmentResponses(list[i])

            }
            console.log(_this.allAssignments);

        }
        vm.getAllAssignmentResponses = function (index) {
            var _this = this;

           // console.log("check      "+JSON.stringify(vm.user._id));
            if(index==1) {
                //console.log("coach= "+ JSON.stringify(vm.user));
                _this.$http.get('/api/assignment/findRemindersByCoach/'+ vm.user._id).then(function (response) {
                    //console.log(JSON.stringify(response.data));

                    _this.allAssignments = _this.allAssignments.concat(response.data);


                });


            }
            else if(index==2){
                //console.log("coach= "+ JSON.stringify(vm.user));
                _this.$http.get('/api/assignment/findSurveysByCoach/'+ vm.user._id).then(function (response) {
                 // console.log(JSON.stringify(response.data));
                    _this.allAssignments = _this.allAssignments.concat(response.data);
                });

            }
            else if (index==0){
                /*
                _this.$http.get('/api/assignment/findRemindersByCoach/'+ vm.user._id).then(function (response) {
                   //console.log(JSON.stringify(response.data));
                    _this.allAssignments = response.data;
                    _this.$http.get('/api/assignment/findSurveysByCoach/'+ vm.user._id).then(function (response) {

                        _this.allAssignments = _this.allAssignments . concat(response.data)
                      // console.log(_this.allAssignments);
                    });
                });*/
                _this.$http.get('/api/message/findByCoach/'+ vm.user._id).then(function (response) {
                   // console.log(JSON.stringify(response.data));

                    _this.allAssignments = _this.allAssignments.concat(response.data);

                });

            }
        };

        vm.newDate = function(arg){
            console.log(arg);
            var v = new Date(arg);
            console.log(v);
            return v;
        };
        vm.getAllAssignmentResponses(1);
        console.log(vm.user.clients);
        vm.editReminder = function ($event, r) {
            var _this = this;

            var reminder = r.reminder;
            console.log("convoReminderResponse " + JSON.stringify(r));
            console.log("reminder " + JSON.stringify(reminder));
            console.log('main controller edit reminder');
            console.log(reminder);
            var self = this;
            //var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            this.$mdDialog.show({
                templateUrl: './dist/view/dashboard/reminders/modal.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: ReminderController,
                controllerAs: "ctrl",
                clickOutsideToClose: true,

                locals: {
                    selected: reminder
                }
            }).then(function (reminder) {
                console.log(reminder.responses);
                //console.log(userSelected);

                // Post request, and push onto users local list of reminders
                // this.$http.post('uri').then((response) => response.data)
                // after promise is succesful add to
                // reminder.assigne.reminders.push()
                _this.$http.post('/api/reminder/update/' + reminder._id, reminder).then(function successCallback(reminder) {
                    console.log('returned junk: ' + JSON.stringify(reminder.data));
                    vm.openToast("Reminder Edited");
                    _this.getAllAssignmentResponses(vm.selected);

                    //  self.selected.reminders.push(response.data);
                    /* if (self.updateReminder(reminder.data)) {
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
                         }
                        vm.openToast("Reminder Edited");
                    }
                    else {
                        //self.openToast("Reminder Not Found!");
                    } */
                });
            }, function () {
                console.log('You cancelled the dialog.');
            });
        };
        vm.removeReminder = function ($event, reminder) {
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

                                vm.openToast("Reminder Removed.");
                                //_this.getRemindersResponses();
                                vm.getAllAssignmentResponses(vm.selected);
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
        vm.openToast = function (message) {
            this.$mdToast.show(this.$mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(5000));
        };
        //old code
        vm.getAllRemindersResponses = function () {
            var _this = this;
            _this.tabIndex = 1;
            _this.allReminders = [];
            var convoReminderResponse = [];
            console.log("Get Reminder");
            vm.user.clients.forEach(function (clien) {


                _this.$http.get('/api/reminder/selectedUser/' + clien._id).then(function (response) {
                    console.log(response.data);


                    response.data.forEach(function (reminder) {
                        var content = [];
                        var fullcontent = {};


                        _this.$http.get('/api/assignment/selectedReminder/' + reminder._id).then(function (response1) {

                            console.log("sadasdasd");
                            console.log(response1);


                            var content = [];
                            response1.data.forEach(function (assignment) {
                                console.log(assignment);

                                _this.$http.get('/api/response/selectedAssignment/' + assignment._id).then(function (response2) {
                                    console.log(response2);

                                    if (response2.data.length === 0) {
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
                                client: clien,
                                reminder: reminder,
                                contentArray: content
                            }
                            console.log('fullcontent');
                            console.log(JSON.stringify(fullcontent));

                            _this.allReminders.push(fullcontent);
                            console.log(JSON.stringify(clien));


                        })

                    })

                })
            })
        };
        //vm.getAllRemindersResponses();

        // $scope.$watch('vm.query.filter', function (newValue, oldValue) {
        //   if(!oldValue) {
        //     vm.bookmark = vm.query.page;
        //   }
        //
        //   if(newValue !== oldValue) {
        //     vm.query.page = 1;
        //   }
        //
        //   if(!newValue)  {
        //     vm.query.page = vm.bookmark;
        //   }
        //
        //   vm.getClients();
        // });

        // Get list of clients that match query

        //   vm.addNote = function (event, client) {
        //      // in case autoselect is enabled
        //   console.log("here lol");
        //   var editDialog = {
        //     modelValue:client.comment,
        //     placeholder: 'Add a comment',
        //     save: function (input) {
        //       if(input.$modelValue === 'Donald Trump') {
        //         return $q.reject();
        //       }
        //       if(input.$modelValue === 'Bernie Sanders') {
        //         return dessert.comment = 'FEEL THE BERN!'
        //       }
        //       dessert.comment = input.$modelValue;
        //     },
        //     targetEvent: event,
        //     title: 'Add a comment',
        //     validators: {
        //       'md-maxlength': 30
        //     }
        //   };
        // };
        vm.toggle1 = function (item, list) {
            console.log(item);
            console.log(list);
            var idx = list.indexOf(item);
            console.log("index");
            console.log(idx);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
            console.log(list);
            vm.callServer(list);
        };

        vm.addNote = function (event, client) {
            // in case autoselect is enabled

            console.log(vm.selectedDataSurvey);


            // var editDialog = {
            //   modelValue: client.tempNote,
            //   placeholder: 'Add a comment',
            //   save: function (input) {
            //     if(input.$modelValue === 'Donald Trump') {
            //       console.log("Haha");
            //       return $q.reject();
            //     }
            //     if(input.$modelValue === 'Bernie Sanders') {
            //       return dessert.comment = 'FEEL THE BERN!'
            //     }
            //     dessert.comment = input.$modelValue;
            //   },
            //   targetEvent: event,
            //   title: 'Add a Note',
            //   validators: {
            //     'md-maxlength': 160
            //   }
            // };
            //
            // var promise = $mdEditDialog.small(editDialog);
            // var input;
            // promise.then(function (ctrl) {
            //   input = ctrl.getInput();
            //   console.log(input);
            //   input.$viewChangeListeners.push(function () {
            //     console.log(input.$modelValue);
            //   });
            //
            // });

        };


        function getClients() {

        }

        // Apply the getClients result to vm
        function success(clients) {
            vm.clients = clients
        }

        /*function ReminderController($mdDialog, userService, selected) {
            this.$mdDialog = $mdDialog;
            this.userService = userService;
            this.selected = selected;
            this.response = "";
            this.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            this.selectedDays = [];
            this.repeat = false;
            this.author = this.userService.get();
            if (this.author.role == "coach") {
                this.author = this.author.id;
                this.assignee = this.userService.selectedUser;
                this.assignee = this.assignee._id;
            }
            else if (this.author.role == "user") {
                this.author = this.author.id;
                this.assignee = this.author;
            }
            if (selected) {
                this._id = selected._id,
                    this.selectedDays = selected.selectedDates,
                    this.reminder = selected.title,
                    this.responses = selected.responses,
                    this.time = new Date();
                this.time.setMinutes(selected.minute);
                this.time.setHours(selected.hour);
                this.time.setMilliseconds(0);
                this.time.setSeconds(0);
                this.repeat = selected.repeat;
            }

            // selectedDays reminder
            ReminderController.prototype.toggle = function (item, list) {
                var idx = this.days.indexOf(item);
                idx = idx + "";
                var index = list.indexOf(idx);
                if (index === -1) {
                    this.selectedDays.push(idx);

                }
                else {
                    this.selectedDays.splice(index, 1);
                }
            }


            ReminderController.prototype.exists = function (item, list) {

                var index = this.days.indexOf(item);
                var answer = false;
                for (var i = 0; i < list.length; i++) {
                    if (index == list[i]) {
                        answer = true;
                    }
                }
                return answer;
            };
            ;
            ReminderController.prototype.toggleAll = function () {
                if (this.selectedDays.length == 7) {

                    this.selectedDays = [];
                }
                else {
                    this.selectedDays = [0, 1, 2, 3, 4, 5, 6];
                }
            };
            ;
            ReminderController.prototype.isChecked = function () {
                return this.selectedDays.length === this.days.length;
            };
            ;
            ReminderController.prototype.isIndeterminate = function () {
                return (this.selectedDays.length !== 0 &&
                this.selectedDays.length !== this.days.length);
            };
            ;
            ReminderController.prototype.select = function () {
            };
            ReminderController.prototype.close = function () {
                this.$mdDialog.cancel();
            };


            ReminderController.prototype.save = function () {
                //console.log("r" + this.selected);
                //console.log("hello select: " +this.selected.responses);
                //console.log(this.time);
                var dates = {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                };

                var days = [];
                var hour = this.time.getHours();
                var minute = this.time.getMinutes();
                var day = this.time.getDay();
                console.log(this.time);
                console.log(day);

                var dateToday = new Date();
                dateToday.setHours(hour);
                dateToday.setMinutes(minute);
                dateToday.setSeconds('00');
                //dateToday.set
                console.log("today date")

                console.log(dateToday);


                if (this.selectedDays.indexOf('Sun') != -1) {
                    dates.sunday = true;
                    days.splice(this.days.length, 0, 0);
                }
                if (this.selectedDays.indexOf('Mon') != -1) {
                    dates.monday = true;
                    days.splice(this.days.length, 0, 1);
                }
                if (this.selectedDays.indexOf('Tues') != -1) {
                    dates.tuesday = true;
                    days.splice(this.days.length, 0, 2);
                }
                if (this.selectedDays.indexOf('Wed') != -1) {
                    dates.wednesday = true;
                    days.splice(this.days.length, 0, 3);
                }
                if (this.selectedDays.indexOf('Thurs') != -1) {
                    dates.thursday = true;
                    days.splice(this.days.length, 0, 4);
                }
                if (this.selectedDays.indexOf('Fri') != -1) {
                    dates.friday = true;
                    days.splice(this.days.length, 0, 5);
                }
                if (this.selectedDays.indexOf('Sat') != -1) {
                    dates.saturday = true;
                    days.splice(this.days.length, 0, 6);
                }
                var object = {
                    _id: this._id,
                    title: this.reminder,
                    days: days,
                    repeat: this.repeat,
                    // Will this be set to server time or user's local time?
                    //toLocaleTimeString(),
                    timeOfDay: dateToday,
                    hour: hour,
                    minute: minute,
                    // array of numbers from 0 to 6 that shows days that we should creat  assignments
                    selectedDates: this.selectedDays,
                    daysOfTheWeek: dates,
                    author: this.author,
                    assignee: this.assignee,
                    responses: this.responses

                };
                console.log(this.time);
                console.log('check time');
                console.log(object.timeOfDay);
                console.log('check assingee');
                console.log(object);

                //console.log(reminder);
                this.$mdDialog.hide(object);
            };
            ReminderController.$inject = ['$mdDialog', 'userService', 'selected'];
            return ReminderController;
        }*/
    }


})();
