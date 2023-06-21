var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
moment.locale('vi');

var indexRouter = require('./routes/index');
var managerRouter = require('./routes/manager');
var employeeRouter = require('./routes/employee');

// Call API
var apiManagerRouter = require('./routes/api/manager');
var apiCustomerRouter = require('./routes/api/customer');

var app = express();
app.locals.moment = moment

var helper = require('./helper/helper');

// helper call format price
app.locals.formatPrice = helper.formatPrice;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', indexRouter);
app.use('/manager', managerRouter);
app.use('/employee', employeeRouter);

// API
app.use('/api/manager', apiManagerRouter);
app.use('/api/customer', apiCustomerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
