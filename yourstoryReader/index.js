/*
INPUT: 1st command line argument yourstory article link/url
OUTPUT: text of yourstory article.

test data: Let Silence Find Your Big Idea #BigIdeas2015 (http://yourstory.com/2015/01/bigideas-2015/)
*/

var util = require('util');
var request = require('request');

//Input vaidation
if(process.argv.length <3){
	console.log("Please enter yourstory article link/url.");
	process.exit(0);
}


var articleURL = process.argv[2];

// request download handle callback
function gotHTML(err, resp, html) {
	if(err){
		console.log("Unable to download due to error: " + util.inspect(err));
		throw err;
	}

	console.log(html);
}
// Download article 
request(articleURL, gotHTML);