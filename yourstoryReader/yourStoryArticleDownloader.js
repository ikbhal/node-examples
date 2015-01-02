/*
INPUT: 1st command line argument yourstory article link/url
OUTPUT: text of yourstory article 
save into file on article name

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
10*)What is applicable character allowed in file name(non alpha numbers)
11)Save text to file based on article name

12)
*/

var util = require('util');
var fs = require('fs');
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
	//console.log("Article title " + title);

	var fileName = title.replace(/\W/g, '_') + '.txt';
	//console.log("fileName: " + fileName);
	//Get text of article
	// selector top section of article text is : post_content entry-content
	var text = $('.post_content.entry-content').text().trim();
	//console.log("Article text is as follows\n" + text);

	fs.writeFile(fileName, text, function(err){
		if(err) {
			console.log("Unable to write to file : " + fileName + " due to error: " + util.inpsect(err));
			throw err;
		}
		//console.log("Successfully writtern article text to file " + fileName);
	});

}
// Download article 
//request(articleURL, gotHTML);

function download(articleURL){
	// Download article 
	request(articleURL, gotHTML);
}

methods.exports = {
	download
}