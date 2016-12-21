/**
 * Created by mehrgankhoshpasand on 2016-12-20.
 */
'use strict';

var NewsLetter= require('../../models/newsLetter.js');
var User = require('../../models/user.js');
var _ = require('underscore');
var winston = require('winston');

exports.create = function(req, res) {
    var newsLetter = new NewsLetter(req.body);
    console.log("newsletter controller hit");
    newsLetter.date.setHours(newsLetter.time.getHours());
    newsLetter.date.setMinutes(newsLetter.time.getMinutes());
    console.log(newsLetter.date);

   newsLetter.save(function(err, newsLetter) {
        if(!err) {
            console.log("NO Error");
            User.findByIdAndUpdate(
                newsLetter.author,
                {$push: {"newsLetters": newsLetter._id}},
                {safe: true},
                function(err, user) {
                    if(err) {
                        winston.error(err);
                    }
                    else {
                        console.log("Newsletter pushed to user.");
                        console.log("User is: " + JSON.stringify(user));
                    }
                }
            );

            res.send(newsLetter);
        }
    });
};

exports.update = function(req, res) {
    console.log('Updating Note');
    console.log();
    var newsLetter = new NewsLetter(req.body);
    console.log("newsletter controller hit");
    newsLetter.date.setHours(newsLetter.time.getHours());
    newsLetter.date.setMinutes(newsLetter.time.getMinutes());
    console.log(newsLetter.date);
    var id =req.params.id;

    NewsLetter.findOneAndUpdate({'_id':id},
        {
            body: newsLetter.body,
            author:newsLetter.author,
            title:newsLetter.title,
            clients: newsLetter.clients,
            time:  newsLetter.time,
            date: newsLetter.date
        }, function(err, newsLetter){
            if(!err){
                console.log('NewsLetter updated: ' + newsLetter);
                res.send(newsLetter);

            }
            else {
                winston.error("crap");
            }

        });

};

exports.delete = function(req, res) {
    console.log("Here newsLetter.delete");
    console.log("id:" + req.params.id);
    NewsLetter.findByIdAndRemove(
        req.params.id,
        function(err, newsLetter){
            if(newsLetter){
                User.findByIdAndUpdate(newsLetter.author,
                    {$pull : {'newsLetters': req.params.id}},
                    function(err, model){
                        if(err){
                            console.log("err in delete newsletter");
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
    NewsLetter.find({author:req.params.id}, function(err, obj){
        res.send(obj);
    })
};
exports.delete = function(req, res) {
    var newsLetterId = req.params.id;
    NewsLetter.findOneAndRemove({_id:newsLetterId},function (err,newsLetter) {
        if(!err){
            console.log("newsLetter deleted");
            User.findOne({_id: newsLetter.author},function (err,user) {
                var oldN = user.newsLetters;
                console.log("checkkkkkkkkkkkkkkkk");
                console.log(oldN);
                for(var i=0; i<oldN.length;i++){
                    if(oldN[i]._id == newsLetterId){
                        oldN.splice(i,1);
                    }
                }
                console.log(oldN);
                User.findOneAndUpdate({_id:newsLetter.author},{newsLetters:oldN},function (err,user1) {
                    if(!err)
                    {
                        console.log("user edited as well");

                        res.send(newsLetter);
                    }
                    else{
                        console.log("err happend");
                        res.send(err);
                    }
                })
            })
        }else{
            console.log("err");
            res.send(err);
        }

    })
};
