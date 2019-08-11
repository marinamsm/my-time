const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const environment = process.env.NODE_ENV || 'development';
const env = config[environment];
const app = express();

// setup server port
const port = process.env.PORT || env.port;

// console.log("mongo: ", env.database);
mongoose.connect(env.database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
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
  res.send({code: res.status, message: err.message});
});

// launch app to listen to specified port
app.listen(port, function () {
    console.log("Running on port " + port);
});

module.exports = app;
