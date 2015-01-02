/*
INPUT: 1.html
OUTPUT: link/url of images, css, javascript, font in 1.html
0)read html page 
1)Get image links
2)Get css links
3)Get javascript links
4)Get font files
5)Check recursive multilevel dependend are downloaded in chrome browser outside code
*/

var util = requie('util');
var fs = require('fs');
var cheerio = require('cheerio');

