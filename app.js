// app.js

// libraries -
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('node:server');
var fs = require('fs');
var bodyParser = require('body-parser');

// app object
var app = express();

// Setup dependency injection and list paths with ElectrolyteJS (Inversion of Control)
var ioc = require('electrolyte');
ioc.loader(ioc.node('models'));
ioc.loader(ioc.node('services'));
ioc.loader(ioc.node('controllers'));
ioc.loader(ioc.node('utils'));
ioc.loader(ioc.node_modules());

// create objects from IoC here:
var database = ioc.create('database');

//var ssl = ioc.create('ssl');

// connect to the database:

database.connect(function (err) {
  if (err) {
    console.log("Unable to connect to the database!");
    console.log(err);
    process.exit(-1);
  }
  else {
    console.log("Connected to database");
  }
});

// setup routing api:
var routes = {
  index: require('./routes'),
  api: require('./routes/api')
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO: put a favicon.ico in ./public/images
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(logger('dev'));
app.use(session({
  store: new MongoStore({
    mongooseConnection: database.getConnection(),
    // time to live:
    ttl: 3360
  }),
  secret: 'Change This',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// register the public directory with express.static for quick access from anywhere:
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
// TODO: resolve
app.use('/api', routes.api);

// catch 404 and forward on to error handler:
app.use(function (res, req, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// TODO: error handlers:

// Get port from environment and store in Express:
var port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

// Create HTTP server. When web site is visited load app object.
var server = http.createServer(app);

// listen on provided port, on all network interfaces.

server.listen(port, function () {
  // callback:
  console.log("Server listening on: http://localhost:%s", port);
});
server.on('error', onError);
server.on('listening', onListening);


// normalize a port into a number, string, or false:
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// error handler function
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

function loadDefaultPage(socket) {
    fs.readFile('./public/templates/index.html', function (err, html) {
	if (err) {
	    throw err; 
	}       
    });
}

// event listeners for HTTP server "listening" event

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  loadDefaultPage(bind);
  console.log('Server is now listening for connections to socket: ' + bind);
};
