/**
 * Created by mehrgankhoshpasand on 2016-12-20.
 */
'use strict';

// Load the module dependencies
var newsLetter= require('../../controllers/api/newsLetterController.js');

// Define the routes module' method
module.exports = function(app) {
    app.post('/api/newsLetter/create', newsLetter.create);
    app.get('/api/newsLetter/remove/:id', newsLetter.delete);
   app.post('/api/newsLetter/update/:id', newsLetter.update);
    app.get('/api/newsLetter/list/:id', newsLetter.list);


};

