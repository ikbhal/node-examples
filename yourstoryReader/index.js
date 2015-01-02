/*
INPUT: 1st command line argument yourstory article link/url
OUTPUT: text of yourstory article.

test data: Let Silence Find Your Big Idea #BigIdeas2015 (http://yourstory.com/2015/01/bigideas-2015/)

TODO:
1*)Download page 
2*)Html parse
3)Get title of article
4)get the text of article
4*)Remove author bio section
5)Get image of article
6)Get links of article
7)Trim extra lines before and after
8)Trim each line Before and after if necessary
9)Remove extra lines more than 1
*/

var util = require('util');
var request = require('request');
var cheerio = require('cheerio');

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

	//console.log(html);
	$ = cheerio.load(html);

	$('.author-bio').html('');

	// Get title of article
	//.entry-title is class your story article
	var title = $('.entry-title').text();
	console.log("Article title " + title);

	//Get text of article
	// selector top section of article text is : post_content entry-content
	var text = $('.post_content.entry-content').text().trim();
	console.log("Article text is as follows\n" + text);
}
// Download article 
request(articleURL, gotHTML);