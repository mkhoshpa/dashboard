/**
 * Created by mehrgan on 20/10/16.
 */
'use strict';

var User = require('../models/user.js');

var knownEvents = {
    'account.updated': function(req, res, next) {
        console.log(req.body.type);
        res.sendStatus(200);
    },
    'account.application.deauthorized': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'application_fee.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'application_fee.refunded': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'balance.available': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.succeeded': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        //console.log(req.body);
        if( req.body.data.object.paid){
            var cus = req.body.data.object.customer;
            User.findOne({ stripeId : cus }, function(err, user) {
                if(!err){
                    var activeDate = user.active_until;
                    activeDate.setMonth(activeDate.getMonth()+1);
                    User.findOneAndUpdate({stripeId: cus} ,{active_until : activeDate} , function (err, obj) {
                        if(!err) {
                            console.log(obj.username + " 1 month extended");
                            res.sendStatus(200);
                        }
                        else{
                            console.log("error in updating user");

                            res.sendStatus(500);

                        }
                    })


                    }
                    else{
                    console.log("error in updating user");

                    res.sendStatus(500);
                }

            });
        }
        else{
            console.log("not paid");

            res.sendStatus(500);
        }



    },
    'charge.failed': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.refunded': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.captured': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.dispute.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.dispute.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'charge.dispute.closed': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.card.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.card.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.card.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.subscription.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.subscription.updated': function(req, res, next) {
        console.log(req.body);
        var cus = req.body.data.object.customer;
        console.log(req.body.data.object.current_period_end);
        var activeDate =new Date(req.body.data.object.current_period_end*1000);


        console.log(activeDate);
        User.findOneAndUpdate({ stripeId : cus },{plan: req.body.data.object.plan.id , active_until: activeDate}, function(err, user) {
            if (!err) {
            //console.log(user.username+' updated');
                res.status(200)
            }
            else{

                console.log(err);

                res.sendStatus(500);
            }
        });


    },
    'customer.subscription.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');

        if(req.body.data && req.body.data.object && req.body.data.object.customer){
            // find user where body.data.object.customer
            User.findOne({
                'stripe.customerId': req.body.data.object.customer
            }, function (err, user) {
                if (err) return next(err);
                if(!user){
                    // user does not exist, no need to process
                    return res.status(200).end();
                } else {
                    user.stripe.last4 = '';
                    user.stripe.plan = 'free';
                    user.stripe.subscriptionId = '';
                    user.save(function(err) {
                        if (err) return next(err);
                        console.log('user: ' + user.email + ' subscription was successfully cancelled.');
                        return res.status(200).end();
                    });
                }
            });
        } else {
            return next(new Error('body.data.object.customer is undefined'));
        }
    },
    'customer.subscription.trial_will_end': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.discount.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.discount.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'customer.discount.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoice.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoice.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoice.payment_succeeded': function(req, res, next) {
        console.log(req.body);
        if( req.body.data.object.paid){
            var cus = req.body.data.object.customer;
            User.findOne({ stripeId : cus }, function(err, user) {
                if(!err){
                    var activeDate =new Date(req.body.data.object.current_period_end*1000);

                    User.findOneAndUpdate({stripeId: cus} ,{active_until : activeDate} , function (err, obj) {
                        if(!err) {
                            console.log(obj.username + " 1 month extended");
                            res.sendStatus(200);
                        }
                        else{
                            console.log("error in updating user");

                            res.sendStatus(500);

                        }
                    })


                }
                else{
                    console.log("error in updating user");

                    res.sendStatus(500);
                }

            });
        }
        else{
            console.log("not paid");

            res.sendStatus(500);
        }
    },
    'invoice.payment_failed ': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoiceitem.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoiceitem.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'invoiceitem.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'plan.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'plan.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'plan.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'coupon.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'coupon.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'recipient.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'recipient.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'recipient.deleted': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'transfer.created': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'transfer.updated': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'transfer.paid': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'transfer.failed': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    },
    'ping': function(req, res, next) {
        console.log(req.body.type + ': event processed');
        res.status(200).end();
    }
};

exports.stripe = function(req, res, next) {
    if(req.body && req.body.type && knownEvents[req.body.type]){
        knownEvents[req.body.type](req, res, next);
    } else {
       return next(new Error('Stripe Event not found'));
  }
    //console.log(req.body.type);
    //res.sendStatus(201);
};
