var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./database/connect');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(db);
app.use(function(req, res, next) {
	res.locals.viewBag = {};
	if(req.session) {
		res.locals.viewBag.user = req.session.user ? req.session.user : {};
	} else {
		res.locals.viewBag.user = null;
	}
	next();
});
app.use(function(req, res, next) {
	var url = req.originalUrl,
		notAuthPage = ['/login', '/register'];
	if(!(notAuthPage.find((i) => i == url))) {
		if(!req.session || !req.session.user) {
			return res.redirect("/login");	
		}
	}
	next();
});

app.use('/', indexRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
