/**
 * Libraries
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet'); // Security
var compression = require('compression'); // Compression
var labels = require("i18n"); // Internationalization labels
var marked = require('marked'); // Markdown
var stylus = require('stylus'); // Stylus

/**
 * Config
 */
// Labels Configuration
labels.configure({
    locales: ['en'],
    directory: path.join(__dirname, 'locales')
});

// Markdown Configuration
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

/**
 * Pages
 */
var routes = require('./routes/index');
var pages = require('./routes/pages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// HTML compress
app.locals.pretty = true;

// Localisation Labels
app.use(labels.init);

// Helmet
app.use(helmet());

// Stylus
app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    force: true,
    compress: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/pages', pages);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;