/**
 * Created by matthewboudreau on 2016-08-30.
 */


//once and for all all the fucking config in one mother fucking place


// Invoke 'strict' JavaScript mode
'use strict';

// LOCAL Server ip and port are in this object so they can be referred to in the configuration object
var server = {
    ip: 'localhost',
    port: '12557'
};

//  STAGING ip and port are in this object so they can be referred to in the configuration object
// var server = {
//     ip: '159.203.61.15',
//     port: '12557'
// };

// DEV Server ip and port are in this object so they can be referred to in the configuration object
// var server = {
//     ip: '159.203.61.14',
//     port: '12557'
//};

// Production Server ip and port are in this object so they can be referred to in the configuration object
// var server = {
//     ip: '159.203.62.215',
//     port: '12557'
// };

// Set the 'development' environment configuration object
module.exports = {

    //local db
    db: 'mongodb://someguy:letmein1@ds011735.mlab.com:11735/thomlocal',

    //dev db

    //db: 'mongodb://thom:letmein1@ds061335.mlab.com:61335/dev',

    //staging 1
    //db: 'mongodb://hansolo:NzJW0mKX4q83cvkHGMT2TcWodbXnOlEH@ds021034.mlab.com:21034/staging1',


    //production
    //db: 'mongodb://thomprod:rZrwcJkzar92@ds157955-a0.mlab.com:57955,ds157955-a1.mlab.com:57955/prod?replicaSet=rs-ds157955',


    server: server,
    messageSocketPort: 45874,
    sessionSecret: 'developmentSessionSecret',
    phoneNumbers: {
        messages: '+12045002320',
        //real 12044005478
        reminders: '+12045002562'
    },
    mandrillApiKey: 'g0tWnJ18NBP7EFHirXvGUQ',
    facebook: {
        clientID: '263454760701655',
        clientSecret: '66bee4e67a7732e0a36ef69bfddbeeec',
        callbackURL: 'http://' + server.ip + ':' + server.port + '/oauth/facebook/callback'
    }
};


/**

//Test-Bots
//
bot_ip: "159.203.61.27";

//development bots

bot_ip: "159.203.61.22";

//production bots

bot_ip: "159.203.61.19";

//staging droplet

server_ip: "159.203.61.15";

//dev droplet

server_ip: "159.203.61.14";

//prod droplet


server_ip: "159.203.62.215";

//local host setting

server_ip: "localhost";

//database locations

db: 'mongodb://someguy:letmein1@ds011735.mlab.com:11735/thomlocal',


**/


