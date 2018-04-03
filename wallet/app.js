const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const app = express();

// Router setting
const indexRouter = require('./routes/index'),
  userRouter = require('./routes/user');


// Set 'views' directory for any views being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());
app.use(cookieParser('!@#%%@#@'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/lib/jquery.min.js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handlerx
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;