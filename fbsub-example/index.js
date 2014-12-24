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
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var routes = require('./routes');
var mongoose = require('mongoose');

//var errorHandler = require('error-handler');

// Load environment variables
env(__dirname + "/.env");

var appId = process.env.APP_ID;
var appSecret = process.env.APP_SECRET;
var verifyToken = process.env.VERIFY_TOKEN;
var callbackUrl = process.env.CALLBACK_URL;

console.log("appId:" + appId + ";appSecret:"  + appSecret +
	 ";verifyToken:" + verifyToken + 
         ";callbackUrl:" + callbackUrl);


// serialize and deserialize
passport.serializeUser(function(user, done){
	//done(null, user);
	console.log('serializeUser: ' + user._id);
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	//done(null, obj);
	User.findById(id, function(err, user){
		console.log(user);
		if(!err) done(null, user);
		else done(err, null);
	});
});



// config
passport.use(new FacebookStrategy({
		clientID: clientID,
		clientSecret: clientSecret,
		callbackURL: callbackUrl
	},
	function(accessToken, refreshToken, profile, done){
		User.findOne({oauthID: profile.id}, function(err,user){
			if(err) { console.log(err); done(err, null);};
			if(!err && user != null ){
				done(null, user);
			} else {
				var user = new User({
					oauthID: profile.id,
					name: profile.displayName,
					created: Date.now()
				});

				user.save(function(err, user){
					if(err){
						console.log(err);
						done(err, nul);
					}else{
						console.log('Saving user ...');
						done(null, user);
					}
				});
			}
		});

	} 
));

//facebook subscription module initialization

fbsub.init({
	appId: appId,
	appSecret: appSecret,
	verifyToken: verifyToken,
	callbackUrl: callbackUrl
});

var object = 'user';
var fields = ['interests','about','about_me','likes'];
// fb authenticate
fbsub.authenticate(function(err){
	if(err == null) {
		fbsub.subscribe(object, fields, function(err){
			if(err == null) {
				console.log('fbsub subscribe succeeded');
			}else {
				console.log('fbsub subscribe failed');
			}
		});
	} else {
		console.log('fbsub auth failed');
	}
});

//Mongo stuff
var MONGO_URI = 'mongodb://localhost/fbsub-example';
var mongo = MONGO_URI;

mongoose.connect(mongo, function(err){
	if(err){
		console.log("Unable to connec to mongo due to err: " + err);
	} else {
		console.log('Connect to mongo successfully');
	}
});

var User = mongoose.model('User', 	{
	oauthID: Number,
	name: String,
	created: Date
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
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

// new routes
// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/account', ensureAuthenticated, function(req, res){
	//res.render('account', {user: req.user});
	User.findById(req.session.passport.user, function(err, user){
		if(err) {
			console.log(err);
		} else {
			res.send('account', {user: user});
		}
	});
});

app.get('/', function(req, res){
	res.render('login', {iser: user});
});

app.get('/auth/facebook', 
	passport.authenticate('facebook'),
	function(req, res){});

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {
		failureRedirect: '/'
	}), 
	function(req, res){
		res.redirect('/account');
	});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


// end of new routes

app.get('/', function(req, res){
  res.send('Real Time Updates of Faceook API, check console.log for request');
});


// Verification for Facebook REquest
app.get('/auth/facebook/callback', fbsub.verify);

// Handle Facebook Push for Realtime Update
app.post('/auth/facebook/callback', function(req, res){
  console.log(util.inspect(req));
});


//check subscription list
// https://graph.facebook.com/<APP_ID>/subscriptions?access_token=<ACCESS_TOKEN>

http.createServer(app).listen(app.get('port'), function(err){
	console.log("Express server is running at port: " + app.get('port'));
});

//test authentication
function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} 
	res.redirect('/');
}