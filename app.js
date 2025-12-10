var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var expressSession = require('express-session');
var indexRouter = require('./routes/index');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** Ejemplo middleware */
/**
app.use( (req, res, next) => {
  console.log('Nueva petición en ' + req.hostname + ' a las ' + (new Date()).toISOString());
  next(); /** este hace que avance al siguiente middleware, si no lo lleva no hace nada*/
/** 
})
*/

/* insertar use para la session y que use la cookie */ 
app.use(
  expressSession({
    secret: 'mi-clave',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

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
  res.render('error');
});
 
module.exports = app;