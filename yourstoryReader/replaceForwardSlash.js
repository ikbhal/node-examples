var str = "/2015/1/02";
var path = require('path');
str = "articles" + path.sep + str.replace(/\//g, path.sep).slice(1, -1) + ".txt";
console.log(str);