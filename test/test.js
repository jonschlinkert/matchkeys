/**
 * matchkeys
 * https://github.com/jonschlinkert/matchkeys
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');


var match = require('../')


// Create our test objects and keywords arrays.
var config = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')), 'utf8');


var multiplePkgs = JSON.parse(fs.readFileSync(path.join(process.cwd(), './test/fixtures/multi.json')), 'utf8');
var singlePkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './test/fixtures/package.json')), 'utf8');


var multiArr = [{keywords: ['A', 'B', 'C', 'D', 'E', 'F'] }, {keywords: ['A', 'B', 'C', 'D', 'I', 'F'] }];
var first = {keywords: ['A', 'B', 'C', 'D', 'E', 'F'] };
var second = {keywords: ['C', 'E', 'G', 'I', 'J'] };


var test = {
  keywords: ['baz', 'bar', 'foo', 'chalk']
};



console.log("matchMany", match.multiKeys(singlePkg, multiplePkgs));

console.log("matchOne", match.keys(first, second));

console.log("isMatchOne", match.isKeywordMatch(first, second));

console.log("TEST", match.resolve(test, singlePkg));

console.log("TEST", match.resolve(test));

console.log("TEST", match.filter('*'));
console.log("TEST", match.filterResolve('node-foo'));
console.log("TEST", match.filterResolve('load-*'));

