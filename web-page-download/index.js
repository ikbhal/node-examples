/*
download web page given url.

0*)Download url page data
1)How to write html to file
2*)How to get title 
3*)How to get website domain name
4*)How to get the current date in yyyy-mm-dd
5)create folder

6*)how to delete file give name

*/

var util = require('util');
var fs = require('fs');
var path =require('path');
var moment = require('moment');
var request = require('request');
var mkdirp = require('mkdirp');
//npm install url --save
var url = require('url'); 
var $ = require('cheerio');

var currentDateStr = moment().format('YYYY-MM-DD');
var defaultURL = 'http://yourstory.com/2015/01/indian-mobile-user-preferences/';
var pageURL = process.argv[2]|| defaultURL;

//Todo 3 get domain name
var domain  = url.parse(pageURL);
var hostname = domain.hostname;
var subDateDir = hostname + path.sep + currentDateStr;
	
// Create folder based on url domain/hostname
mkdirp(hostname, function(err){
	if(err){
		console.log("Unable to creat folder name: " + hostname + " due to error: " + util.inpsect(err));
		throw err;
	}
	console.log("Create of exist dir: " + hostname);
	mkdirp(subDateDir, function(err){
		if(err){
			console.log("Unable to creat folder name: " + hostname + " due to error: " + util.inpsect(err));
			throw err;
		}
		console.log("Create of exist dir: " + subDateDir);

		// Donwload html content of url
		request(pageURL, gotHTML);
	});
});

function gotHTML(err, resp, html) {
  if (err) return console.error(err);

  var parseHTML = $.load(html);

  // get the title of page url.
  var title = parseHTML('title').text();
  //console.log('title: ' + title);
  //console.log(html);

  //1. Write to file 
  
  var fileName = subDateDir + path.sep + title.replace('?', '') + ".html";
  fs.writeFile(fileName , html, function(err){
  	if(err){
  		console.log("Unable to write to file name: " + fileName + " due to error: " + util.inspect(err));
  	}else {
  		console.log("Successfuly write to filename: " +fileName);

  		// DEV remove file
  		//fs.unlinkSync(fileName);
  	}
  });

  var urls = [];
  parseHTML('img').map(function(i, img){
  	var src = $(img).attr('src');
  	console.log(src);
  	urls.push(src);
  });

}


