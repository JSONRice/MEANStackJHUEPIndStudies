//app.js
var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , bodyParser = require('body-parser')
  , logger = require('morgan');

 
var app = express();
var port = 8081;
 
var publicDir = path.join(__dirname, 'proangularjs/chapter02/');

console.log("Serving from path: " + publicDir);

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json()); //parses json, multi-part (file), url-encoded  

// List of files to serve up statically:
app.use(express.static(path.join(__dirname, 'proangularjs/')));
app.use(express.static(path.join(__dirname, 'proangularjs/js')));
app.use(express.static(path.join(__dirname, 'proangularjs/css')));

// The following is the lander page:
app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'listing_12.html'));
});
 
var server = http.createServer(app);
 
// reload code here 
// optional server delay argument can be given to reload, refer to API below 
reload(server, app);
 
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});
