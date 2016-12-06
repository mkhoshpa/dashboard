/**
 * Created by mehrgankhoshpasand on 2016-11-28.
 */
'use strict';

var Group = require('../../models/group.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var winston = require('winston');

exports.create = function(req, res) {
    var group = new Group(req.body);
    console.log("group controller hit");

    group.save(function(err, group) {
        if(!err) {
            console.log("NO Error");

            res.send(group);
        }
    });
};


exports.addFromUser = function(req, res) {
    console.log('addFromUser hit');

    var groupsToBeAdded = req.body;
    console.log(groupsToBeAdded);
    groupsToBeAdded.forEach(function (group) {
        User.findOneAndUpdate({_id:req.params.id}, {$push: {"groups": group }},function (err,user) {
            if(!err){
                console.log('added to user');
            }


        });

        Group.findOneAndUpdate({_id:group},{$push:{"memebers": req.params.id}},function (err,g) {
            if(!err) {
                console.log('added to group');
            }

        })

    });
    res.sendStatus(200);


};


exports.removeFromGroup = function(req, res) {
    console.log('removeFromGroup hit');
    var listToBeDeleted = req.body;
    var groupId = req.params.id;
    console.log('list to be deleted');
    console.log(listToBeDeleted);
    //console.log(groupId);

    Group.findOne({_id:groupId},function (err,group) {
        if(!err) {
            var members = group.memebers;
            console.log(members);
            var newmembers = [];
            members.forEach(function (member) {
                if (listToBeDeleted.indexOf(member+'') < 0) {
                    newmembers.push(member);
                }

            });
            console.log('newmembers aree:');
            console.log(newmembers);
            Group.findOneAndUpdate({_id: groupId},{memebers: newmembers} ,function (err, group) {
                if(!err) {

                    listToBeDeleted.forEach(function (member) {

                        User.findOne({_id:member},function (err,user) {
                            if(!err && user!= null){
                                var oldGroups = user.groups;
                                var newGroups=[];
                                oldGroups.forEach(function (oldGroupId) {
                                    if(oldGroupId != groupId){
                                        newGroups.push(oldGroupId)
                                    }


                                });
                                User.findOneAndUpdate({_id:member},{groups:newGroups},function (err,user1) {
                                    if(!err) {
                                        console.log('deleted from  a user');
                                    }
                                });
                            }

                        })

                    });

                    res.send(group)
                }
                else{
                    res.send(err);
                }

            });
        }
        else{
            res.send(err);
        }

    });

};
exports.addClient = function(req, res) {

    console.log('addClient hit');
    console.log('req.body   '+req.body);
    console.log(req.params.id);
    console.log(req.body.selectedUsers );
    Group.findOneAndUpdate({_id: req.params.id},{memebers:req.body }, function(err, group){
      if(!err){
req.body.forEach(function (member) {
    console.log('check memmmmmmberrrrrrrrrr');
console.log(member);
    User.findOne({_id:member} , function (err,user) {
        if(!err && user != null) {
            console.log(user);
            var idi= req.params.id;
            idi=idi+"";

            console.log('user groups: ');
            console.log(user.groups);

            console.log(idi);
            console.log(user.groups.indexOf(idi));
            if(user.groups.indexOf(idi)  < 0){
                User.findOneAndUpdate({_id: member}, {$push: {"groups": req.params.id}}, function (err, user) {
                    if (!err) {
                        console.log('add to user done');
                    }
                });
            }
        }
    })

});




           console.log('addClient was siccesfull');
           res.send(group);
        }else{
           res.send(err);
        }
    });





};

exports.deleteClient = function(req, res) {
    console.log('delete client hit');
    console.log(req.params.id);
    User.findOne({_id: req.params.id+''},function (err,user) {
        if (!err){
            //console.log(user);
            var groups = user.groups;
            console.log(groups);
        groups.forEach(function (groupId) {
            //var intId = parseInt(groupId);
            Group.findOne({_id: groupId}, function (err, group) {
console.log('eyyyy');
                if (err) {

                    console.log(err);
                } else {
                    console.log('222y2')
console.log(group.memebers);
                var idi = req.params.id ;
                if (group.memebers.indexOf(idi) > 0) {
                    var newMemebers = [];

                    group.memebers.forEach(function (member) {
                        if (member != idi) {
                            newMemebers.push(member);
                        }
                    });
                    console.log('newmembers');
                    console.log(newMemebers);
                    Group.findOneAndUpdate({_id: groupId}, {memebers: newMemebers}, function (err, group) {
                        if (!err) {
                            console.log('delete from group done');
                            console.log(newMemebers);
                            //res.send(group);
                        }
                        else {
                            res.send(err);
                        }
                    })

                }

            }
            })

        });
        res.sendStatus(200);

    }
    else{
            res.send(err);
        }
    })

};


exports.update = function(req, res) {
    console.log('Updating Note');
    console.log();
    Note.findOneAndUpdate({'_id': req.body._id},
        {
            body: req.body.body,
            author:req.body.author,
            assignee:req.body.assignee
        }, {new:true}, function(err, note){
            if(!err){
                console.log('Note updated: ' + note);
                User.findById(req.body.assignee, function(err, user){
                    if(err){
                        console.log(err);
                    }
                    var _user = user;
                    var user = user.toObject();
                    console.log('The user is: ' + JSON.stringify(user));
                    console.log('The user\'s id is: ' + user._id);
                    console.log('User.notes is: ' + JSON.stringify(user.notes));
                    for (var i = 0; i < user.notes.length; i++) {
                        if (user.notes[i]._id == req.body._id) {
                            user.notes[i] = note;
                            console.log(JSON.stringify(user.notes[i]));
                            res.send(req.body);
                        }
                    }
                    _user.set(user);
                    _user.save(function (err, doc) {
                        console.log(JSON.stringify(doc));
                    });

                });
            }
            else {
                winston.error("crap");
            }

        });

};

exports.delete = function(req, res) {
    console.log("Here note.delete");
    console.log("id:" + req.params.id);
    Note.findByIdAndRemove(
        req.params.id,
        function(err, note){
            if(note){
                User.findByIdAndUpdate(note.assignee,
                    {$pull : {'notes': note}},
                    function(err, model){
                        if(err){
                            console.log("Help");
                        }
                    });
                res.sendStatus(200);
            }
            else{
                console.log();
                winston.error(err);
                res.sendStatus(500);
            }
        }
    )
};

exports.list = function(req, res) {
    var id= req.params.id;
    console.log("group list");
    Group.find({coach:id}, function(err, obj){
        res.json(obj);
    })
};


exports.addToGroup = function(req, res) {
    console.log("add to group");
    res.sendStatus(200);
};
