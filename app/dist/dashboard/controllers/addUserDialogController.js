/// <reference path="../_all.ts" />
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var AddUserDialogController = (function () {
            function AddUserDialogController($mdDialog,$scope, Upload, $timeout, userService,selected) {
                this.$mdDialog = $mdDialog;
                this.userService = userService;
                this.selected = selected;
                this.cc=0;
                this.d="";
                this.Upload=Upload;
                this.$timeout=$timeout;

                               this.user = this.userService.get();
                //console.log(this.user);
                console.log("selected " + JSON.stringify(this.selected));

                //creator: any = this.userService.get();
                this.avatars = [
                  "matt.png", "thom.png", "tiffany.png", "victoria.png"
                ];
                this.image_source="aybaba";
                if (selected) {
                    this.edit=true,

                        this.username= selected.username,
                        this.firstName= selected.firstName,
                        this.lastName = selected.lastName,
                        this.phoneNumber= parseInt(selected.phoneNumber),
                        this.bio=selected.bio,
                        this.email = selected.email,
                        this.id=selected._id,
                    this.messages = selected.messages;

                }
            }
            AddUserDialogController.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };

            AddUserDialogController.prototype.setFile = function() {
                var _this=this;

                _this.image_source = event.target.result;
                _this.cc=10;
            };
            AddUserDialogController.prototype.uploadPic = function(file) {
                var self=this;
                console.log('hit');
                var newuser={username: this.username,firstName:this.firstName,lastName:this.lastName,bio:this.bio,phoneNumber:this.phoneNumber,coaches: this.user._id, role: "user",imgUrl:'assets/img/'+this.username};
                    file.upload = self.Upload.upload({
                        url: '/api/photo',
                        data: {username: this.username,firstName:this.firstName,lastName:this.lastName,bio:this.bio,phoneNumber:this.phoneNumber,coaches: this.user._id,
                    role: "user", file: file},
                    });

                    file.upload.then(function (response) {
                        self.$timeout(function () {
                            console.log(response.data);
                            file.result = response.data;
                           self.$mdDialog.hide(newuser);

                        });
                    }, function (response) {
                        if (response.status > 0)
                            this.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                };



            AddUserDialogController.prototype.save1 = function () {
                //adding user
                if(!this.edit) {


                    console.log("Saving new user.");
                    /*var user = {
                     firstName: 'Shadfdasda',
                     lastName: 'Peleiafdaser',
                     bio: 'This is my bo. It afasis aweome.',
                     username: 'slajlkflier',
                     password: 'ilinnafdafpafai',
                     slack_id: 'efe235gafafdassaf',
                     slack: {
                     email: 'shne.peleier@ufadfnb.ca',
                     id: 'speltadffadfsi',
                     name: 'Shnsgfsadsfage',
                     real_name: 'Safdashne Padfasfseaaaaalltier',
                     },
                     coaches: [this.user._id]
                     };*/
                    var user = {
                        newUser: true,
                        firstName : this.firstName,
                        lastName: this.lastName,
                        bio: this.bio,
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        fullName:  this.firstName + this.lastName,
                        /*
                         slack_id: this.slack_id,
                         slack: {
                         email: this.slack.email,
                         id: this.slack.id,
                         name: this.slack.real_name,
                         img: '/assets/img/' + this.avatars[Math.floor(Math.random() * 7)]
                         },
                         */
                        coaches: [this.user._id],
                        role: "user",

                        imgUrl: '/assets/img/' + this.avatars[Math.floor(Math.random() * 3)],
                        phoneNumber: "+1"+this.phoneNumber
                    }
                    console.log(user);

                    this.$mdDialog.hide(user);
                }
                //editing user
                else{
                    console.log(" editing user.");
                    /*var user = {
                     firstName: 'Shadfdasda',
                     lastName: 'Peleiafdaser',
                     bio: 'This is my bo. It afasis aweome.',
                     username: 'slajlkflier',
                     password: 'ilinnafdafpafai',
                     slack_id: 'efe235gafafdassaf',
                     slack: {
                     email: 'shne.peleier@ufadfnb.ca',
                     id: 'speltadffadfsi',
                     name: 'Shnsgfsadsfage',
                     real_name: 'Safdashne Padfasfseaaaaalltier',
                     },
                     coaches: [this.user._id]
                     };*/
                    var user = {
                        _id : this.id,
                        newUser : false,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        bio: this.bio,
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        messages: this.messages,
                        /*
                         slack_id: this.slack_id,
                         slack: {
                         email: this.slack.email,
                         id: this.slack.id,
                         name: this.slack.real_name,
                         img: '/assets/img/' + this.avatars[Math.floor(Math.random() * 7)]
                         },
                         */
                        coaches: [this.user._id],
                        role: "user",

                        imgUrl: '/assets/img/' + this.avatars[Math.floor(Math.random() * 3)],
                        phoneNumber: this.phoneNumber
                    }
                    console.log(user);

                     this.$mdDialog.hide(user);
                }
            };
            AddUserDialogController.$inject = ['$mdDialog','$scope', 'Upload', '$timeout', 'userService','selected'];

            return AddUserDialogController;
        }());
        dashboard.AddUserDialogController = AddUserDialogController;
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=addUserDialogController.js.map
