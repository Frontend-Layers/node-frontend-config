// Dependences
var less = require('less-middleware')
  ,	express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express();

// Configure
app.configure(function () {
	var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use('/img', express['static'](path.join(bootstrapPath, 'img')));
	app.use(app.router);
	app.use(less({
		src    : path.join(__dirname, 'public', 'less'),
		paths  : [path.join(bootstrapPath, 'less')],
		dest   : path.join(__dirname, 'public', 'styles'),
		prefix : '/styles'
	}));
	app.use(express['static'](path.join(__dirname, 'public')));	
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});