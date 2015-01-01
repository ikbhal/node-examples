var xpath = require('xpath'),
	dom = require('xmldom').DOMParser;


var xml = "<book><title>Harry Potter</title></book>"
var doc = new dom().parseFromString(xml)
var nodes = xpath.select("//title", doc)
console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
console.log("node: " + nodes[0].toString())