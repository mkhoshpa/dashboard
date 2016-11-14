'use strict';

// Load the module dependencies
var user = require('../../controllers/user.info.controller.js');
var formidable = require("express-formidable");
var fs = require('fs');
var sharp = require('sharp');


// Define the routes module' method
module.exports = function(app) {

  app.post('/api/user/create', user.create);
  app.post('/api/user/get', user.get);
  app.post('/api/user/setPhoto', user.setPhoto);


  app.post('/api/user/delete/:id', user.delete);
  app.post('/api/coach/newuser/:id', user.updateCoach);
//  app.post('/api/user/surveyTemplate/add/:id', user.addSurvey);
  app.get('/api/user/selectedAssignment/:id', user.getUser);
  app.post('/api/user/updateMedium/:id', user.updateMedium);
  app.post('/api/user/updateSlackId/:id', user.updateSlackId);
  app.get('/api/user/slackId/:id', user.bySlackId)
  app.post('/api/user/parse-csv', user.parseCSV);
  app.get('/api/user/unsub/:id', user.unsub);
  app.post('/api/user/sub', user.sub);
    app.post('/api/user/resub', user.resub);
  app.use(formidable({
    encoding: 'utf-8',
    uploadDir: './server/views/assets/img',
    multiples: true, // req.files to be arrays of files
  }));
  app.post('/upload',function (req,res) {
    console.log(req.fields);
    console.log(req.files.file.path);

    res.sendStatus(200);
  });

  app.post('/api/photo',function(req,res){
    console.log(req.fields);
    console.log(req.files.file.path);
    fs.rename(req.files.file.path,'./server/views/assets/img/'+req.fields.username );

   res.send( user.createWithPhoto(req.fields));
//res.sendStatus(200);
    /*upload(req.files,res,function(err) {
     if(err) {
     return res.end("Error uploading file.");
     }
     res.end("File is uploaded");
     });*/

  });

  app.post('/api/editPhoto', user.editImage);



};
