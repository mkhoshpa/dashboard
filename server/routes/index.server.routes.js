module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
    app.post('/contact', index.contact);
    app.get('/contactUs', index.renderContactUs);

};
