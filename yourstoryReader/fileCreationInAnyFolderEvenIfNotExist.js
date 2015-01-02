/*
INPUT: file name with path 
OUTPUT: creat file in specified path

*/

var fs = require('fs');
var path = require('path');
var outputFile = require('output-file');

// When the direcory `foo` exists:
outputFile('foo/bar/baz.txt', 'Hi!', function(err, createdDir) {
  if (err) {
    throw err;
  }

  createdDir === path.resolve('foo/bar'); //=> true
  fs.readFileSync('foo/bar/baz.txt').toString(); //=> 'Hi!'
});