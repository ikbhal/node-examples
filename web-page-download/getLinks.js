/*
INPUT: 1.html
OUTPUT: link/url of images, css, javascript, font in 1.html
*0)read html page 
1)Get image links
2)Get css links
3)Get javascript links
4)Get font files
5)Check recursive multilevel dependend are downloaded in chrome browser outside code
*/

var util = require('util');
var fs = require('fs');
var cheerio = require('cheerio');

var inputFile = process.argv[2] || "1.html";

var htmlContent = '';

//o Read inputfile
fs.readFile(inputFile, function(err, data){
	if(err){
		console.log("Error while reading file : " + inputFile + " due to error: " + util.inspect(err));
		throw err;
	} 
	htmlContent = data;
	//console.log("htmlContent is \n" + htmlContent);
	// Preapare cheerio
	$ = cheerio.load(htmlContent);
	$('img').map(function(i, image){
		var src = $(image).attr('src');
		console.log(src);
	});
});



