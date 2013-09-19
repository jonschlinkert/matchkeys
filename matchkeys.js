/**
 * matchkeys
 * https://github.com/jonschlinkert/matchkeys
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var minimatch = require('minimatch');
var resolveDep = require('resolve-dep');


// Export the matchkeys object.
exports = module.exports = {};


// Create Array.isArray() if it's not already natively available.
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var isArray = function (src) {
  return Array.isArray(src) && src instanceof Array;
};


// Ensure config has keywords
function loadPkg(config) {

  var result = {}
  result.keywords = []

  if (typeof config !== 'object') {
    config = require(path.resolve(process.cwd(), 'package.json'));
  }

  // populate keywords, if any
  if(isArray(config.keywords)) {
    result.keywords = config.keywords;
  } else {
    console.log(chalk.red("Error: No keywords found. Keywords must be formatted as an array."));
  }

  return result;
}

/**
 * Compare an array of keywords against multiple arrays of keywords.
 * @param  {Array} keys         Keywords to test against.
 * @param  {Array} multiArrays  Array of objects, each with a keywords property/array
 * @return {Array}              Array of matching keywords
 */
exports.multiKeys = function(keys, multiArrays) {
  return _.filter(multiArrays, function(arr) {
    return _.intersection(keys.keywords || [], arr.keywords || []).length > 0;
  });
};

/**
 * Compare two arrays of keywords
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */
exports.keys = function(a, b) {
  return _.intersection(a.keywords || [], b.keywords || []);
};

/**
 * Compare two arrays of keywords and return true if ANY keywords match.
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */
exports.isKeywordMatch = function(a, b) {
  return _.intersection(a.keywords || [], b.keywords || []).length > 0;
};


/**
 * Resolve paths to keywords based on keyword matches
 * @param  {[type]} keys   [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
exports.resolve = function (keys, config) {
  config = loadPkg(config);
  return exports.matchkeys(keys, config).map(function (keywords) {
    return resolveDep.resolvePath(keywords);
  });
};

/**
 * Return any keywords in the given list that match keywords in config.keywords.
 * @param  {[type]} pattern [description]
 * @param  {[type]} config  [description]
 * @return {[type]}         [description]
 */
exports.filter = function(pattern, config) {
  config = loadPkg(config);
  var search = config.keywords;
  return minimatch.match(search, pattern, {});
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */
exports.filterResolve = function (patterns, config) {
  return exports.filter(patterns, config).map(function (pattern) {
    return resolveDep.resolvePath(pattern);
  });
};