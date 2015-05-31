
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Busboy = require('busboy');
var os = require('os');
var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy()); 


app.get('/', routes.index);
app.get('/users', user.list);



app.post('/api/photos', function(req, res) {
    
    var saveTo;
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log(filename);
      saveTo = filename;
      console.log(saveTo);
      res.send({
        path: saveTo
      });
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });

    
    return req.pipe(busboy);
});

app.post('/upload/:fbId', function(req, res) {
  console.log(req);
  console.log(req.query.name + " is uploading");
  console.log(req.query.userText);
  // upload to unauthorized folder
  var folder = "unauthorized/" + req.params.fbId;
  try {
    fs.mkdirSync(folder);
  } catch(err) {
    console.log("mkdir " + folder + " error: " + err.code);
  }
  
  var path = '/images/' + req.params.fbId;
  var saveTo = folder + "/image";

  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('fbId = ' + req.params.fbId + 'file: ' + filename);

    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    //res.writeHead(200, { 'Connection': 'close' });
    res.send({
      'path': path
    });
    //res.end("That's all folks!");
  });

  return req.pipe(busboy);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
