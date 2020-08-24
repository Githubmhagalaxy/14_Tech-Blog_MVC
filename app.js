var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var methodOverride = require('method-override')
var session = require('express-session');
var exphbs  = require('express-handlebars');
var sequelize = require('./config/connection');

var SequelizeStore = require("connect-session-sequelize")(session.Store);

var routes = require('./routes/index');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({
  helpers: require('./config/handlebars')
}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(session({
  key: 'user_sid',
  secret: "anysecret",
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});





app.use(routes);


module.exports = app;
