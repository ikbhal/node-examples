if(process.argv.length <3){
	console.log("Please enter play list url");
	process.exit(0);
}
var $ = require('cheerio')
var fs = require('fs')
var request = require('request')
var ytdl = require('ytdl-core');

//var htmlString = fs.readFileSync('1.html').toString()

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  // get all img tags and loop over them
  var imageURLs = []
  parsedHTML('.pl-video-title-link').map(function(i, link) {
    var url = $(link).attr('href')
    var title = $(link).text().trim();

    console.log(text + "," + href);

		var fileName = title.replace(/\W/g, "_").toLowerCase()+ ".flv";
	
		console.log("downloading to fileName: " + fileName + " from url: " + url+ "<<");
	
		ytdl(url)
  		.pipe(fs.createWriteStream(fileName));
  
  })
}
var url = process.argv[2] ;
//'https://www.youtube.com/playlist?list=PLb1c0oEEXWIZiWzdtUOUhlirJr2fXfbxX';

request(url, gotHTML)

/*
var parsedHTML = $.load(htmlString)

// query for all elements with class 'foo' and loop over them
parsedHTML('.pl-video-title-link').map(function(i, foo) {
  // the foo html element into a cheerio object (same pattern as jQuery)
  foo = $(foo)
  console.log(foo.text().trim()+",https://www.youtube.com" + foo.attr('href'));
})
*/