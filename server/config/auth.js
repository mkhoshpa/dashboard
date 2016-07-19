// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {

        'clientID'      : '263815477332250', // your App ID
        'clientSecret'  : '538d5a2fa3b070dc66070700b8229a64', // your App Secret
        'callbackURL'   : 'http://localhost:12557/oauth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
