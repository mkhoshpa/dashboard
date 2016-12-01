/**
 * Created by mehrgankhoshpasand on 2016-11-28.
 */
'use strict';

// Load the module dependencies
var group= require('../../controllers/api/groupController.js');

// Define the routes module' method
module.exports = function(app) {
    app.get('/api/groups/list/:id', group.list);
    app.post('/api/group/addClient/:id', group.addClient);

    app.post('/api/group/deleteUser/:id', group.deleteClient);
    app.post('/api/group/removeFromGroup/:id',group.removeFromGroup );
    app.post('/api/group/create', group.create);


};
