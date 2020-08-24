var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const indexRouter = require('./index/index');
const dashboardRouter = require('./dashboard/index');

router.use('/', indexRouter);
router.use('/dashboard', dashboardRouter)

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = router;
