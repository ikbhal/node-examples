/**
INPUT: yourstory.com url
OUTPUT: links of articles
title of article

blogposts-inner div  with attributes
id: article text, rel attribute for link
 url: http://yourstory.com/
*/

var util = require('util');
var request  = require('request');
var cheerio = require('cheerio');

//constants
var yourstoryURL = "http://yourstory.com";

function gotHTML(err, resp, html) {
	if(err) {
		console.log("Unable to load page due to error: " + utils.inspect(err));
		throw err;
	}
	//console.log(html);

	//Load cheeerio
	$ = cheerio.load(html);
	$('.blogposts-inner').map(function(i, article){
		var title = $(article).attr('id');
		var link = $(article).attr('rel');

		console.log(">>" + title + "," + link+ "<<");
	});
}

request(yourstoryURL, gotHTML);