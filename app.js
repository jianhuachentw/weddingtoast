
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var toasts = require('./routes/toasts');
var raffleDraw = require('./routes/raffleDraw');
var pending = require('./routes/pending');
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
app.use(express.static(path.join(__dirname, '/unauthorized')));
app.use(express.static(path.join(__dirname, '/authorized')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/toasts', toasts.toasts);
app.get('/raffle-draw', raffleDraw.raffleDraw);
app.get('/pending', pending.pending);

app.post('/accept/:fbId', function(req, res) {
  console.log("accepting " + req.params.fbId);

  var oldPath = 'unauthorized/' + req.params.fbId;
  var newPath = 'authorized/' + req.params.fbId;

  if (fs.existsSync(newPath)) {
    deleteFolderRecursive(newPath);
  }

  fs.rename(oldPath, newPath, function() {
    res.send({
      'id': req.params.fbId
    });
  });
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

  // save name
  fs.writeFile(folder + "/name", req.query.name, function(err) {
    if (err) console.log(err);
  });

  // save text
  fs.writeFile(folder + "/text", req.query.userText, function(err) {
    if (err) console.log(err);
  });

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


function deleteFolderRecursive(path) {
  if(fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};