var fs = require('fs');
var ytdl = require('ytdl-core');


if(process.argv.length < 3){
	console.log('Please input youtube url to download');
	process.exit(0);
}
var yturl = process.argv[2];

var outputFile = 'video.flv';// default output file video.flv

if(process.argv.length > 3){
	 outputFile = process.argv[3];
}

//console.log('yturl:' + yturl);
//console.log('outputFile:' + outputFile);
/*
input:
1) youtube url: 
2) save to video.flv or specified file name

*/

ytdl(yturl)
  .pipe(fs.createWriteStream(outputFile));
  