const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



require('./lib/connectMongoose');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', require('./routes/users'));
app.use('/api/admin', require('./routes/admin/admins'));
app.use('/api/category',require('./routes/categories'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

 // validation error
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }
  
  // render the error page
  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
