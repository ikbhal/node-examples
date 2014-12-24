var env = require('node-env-file');
var util = require('util');
var fbsub = require('fbsub');
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
//var errorHandler = require('error-handler');

// Load environment variables
env(__dirname + "/.env");

var appId = process.env.APP_ID;
var appSecret = process.env.APP_SECRET;
var verifyToken = process.env.VERIFY_TOKEN;
var callbackUrl = process.env.CALLBACK_URL;

console.log("appId:" + appId + ";appSecret:"  + appSecret
	+ ";verifyToken:" + verifyToken 
	+ ";callbackUrl:" + callbackUrl);

//facebook subscription module initialization


fbsub.init({
	appId: appId,
	appSecret: appSecret,
	verifyToken: verifyToken,
	callbackUrl: callbackUrl
});

var object = 'user';
var fields = 'interests,about, about_me,likes';
// fb authenticate
fbsub.authenticate(function(err){
	if(err == null) {
		fbsub.subscribe(object, fields, function(err){
			if(err == nul) {
				console.log('fbsub subscribe succeeded');
			}else {
				console.log('fbsub subscribe failed');
			}
		});
	} else {
		console.log('fbsub auth failed');
	}
});

var app = express();

app.set('port', 80);
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
//app.use(errorHandler());
app.use(methodOverride());
app.use(session({
	secret: 'workshop-planner', resave : false, saveUnitialized:true
}));
app.use(cookieParser());


app.get('/', function(req, res){
  res.send('Real Time Updates of Faceook API, check console.log for request');
});

// Verification for Facebook REquest
app.get(callbackUrl, fbsub.verify);

// Handle Facebook Push for Realtime Update
app.post(callbackUrl, function(req, res){
  console.log(util.inspect(req));
});


//check subscription list
// https://graph.facebook.com/<APP_ID>/subscriptions?access_token=<ACCESS_TOKEN>

http.createServer(app).listen(app.get('port'), function(err){
	console.log("Express server is running at port: " + app.get('port'));
});
