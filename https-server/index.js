var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/home/toprecur/ssl/key.pem'),
  cert: fs.readFileSync('/home/toprecur/ssl/cert.pem')
};

// Create a service (the app object is just a callback).
var app = express();
app.get('/', function(req, res){
  res.send('Hello World');
});
// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
