var xpath = require('xpath'),
	dom = require('xmldom').DOMParser;

var fs = require('fs')
fs.readFile('1.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //var xml = "<book><title>Harry Potter</title></book>"
	var doc = new dom().parseFromString(data)
	var nodes = xpath.select("//pl-video-title-link", doc)
	console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
	console.log("node: " + nodes[0].toString())
});

