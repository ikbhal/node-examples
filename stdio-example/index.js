/*
Purpose: Test stdio npm module for testign command line options

Testing:
node <your_script.js> -c 23 45 --map -k 23 file1 file2
Then ops object will be as follows:

{ check: [ '23', '45' ],
  args: [ 'file1', 'file2' ],
  map: true,
  kaka: '23' }
*/
'use strict';
var stdio = require('stdio');
var ops = stdio.getopt({
    'check': {key: 'c', args: 2, description: 'What this option means'},
    'map': {key: 'm', description: 'Another description'},
    'kaka': {args: 1, mandatory: true},
    'ooo': {key: 'o'}
});

if (ops.kaka && ops.check) {
    console.log(ops.kaka + ops.check[0]);
}