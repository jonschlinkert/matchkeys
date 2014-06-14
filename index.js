/**
 * matchkeys <https://github.com/jonschlinkert/matchkeys>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matched = require('matched');
var _ = require('lodash');

// Export the matchkeys object.
var matchkeys = module.exports = {};

var toArray = function(val) {
  return !Array.isArray(val) ? [val] : val;
};

var pkg = require('./package');
console.log(pkg);


/**
 * Compare two arrays of keywords
 * @param  {[type]} keywords [description]
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */

matchkeys.find = function(a, b) {
  a = loadKeywords(a);
  b = loadKeywords(b);
  return _.intersection(a, b);
};


/**
 * Compare two arrays of keywords and return true if ANY keywords match.
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */

matchkeys.hasMatch = function(a, b) {
  return matchkeys.find(a, b).length > 0;
};


/**
 * Return any keywords in the given list that match keywords in config.keywords.
 * @param  {[type]} pattern [description]
 * @param  {[type]} config  [description]
 * @return {[type]}         [description]
 */

matchkeys.filter = function(config, pattern, options) {
  var keywords = loadKeywords(config);
  return minimatch.match(keywords, pattern, options);
};


/**
 * Resolve paths to npm modules based on keyword matches
 * @param  {[type]} keys   [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */

matchkeys.resolve = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.dep(pattern).join();
  })));
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */

matchkeys.resolveDev = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.dev(pattern).join();
  })));
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */

matchkeys.resolveAll = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.all(pattern).join();
  })));
};