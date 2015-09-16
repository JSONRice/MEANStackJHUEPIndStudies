// app.js

// libraries -
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
ver session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('node:server');
var fs = require('fs');
var reload = require('reload');
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
var ssl = ioc.create('ssl');

// connect to the database:
database.connect(function(err) {
	if (err) {
	    console.log("Unable to connect to the database!");
	    console.log(err);
	    process.exit(-1);
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

// TODO: drop favicon.ico in ./public/images
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(logger('dev'));

app.use(session({
  store: new MongoStore({
    mongooseConnection: database.getConnection(),
    // time to live:
    ttl: 3360 
  }),
  secret: 'Change This'
  resave: true,
  saveUnitialized: true	      
})));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));